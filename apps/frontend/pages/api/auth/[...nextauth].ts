import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

// Fungsi refresh token ke backend
async function refreshAccessToken(token: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/getaccess`,
      { refreshToken: token.refreshToken }
    )

    const { accessToken, refreshToken } = res.data

    return {
      ...token,
      accessToken,
      refreshToken,                                    // token baru hasil rotation
      accessTokenExpires: Date.now() + 60 * 60 * 1000 // 1 jam
    }
  } catch {
    // Refresh gagal → tandai error, jangan hapus token
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { email: credentials?.email, password: credentials?.password }
          )
          const { accessToken, refreshToken } = res.data
          if (accessToken) {
            return { id: 'user', accessToken, refreshToken }
          }
          return null
        } catch {
          return null
        }
      }
    })
  ],

  session: {
    maxAge: 30 * 24 * 60 * 60 // ← tambah ini: session NextAuth = 30 hari
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Saat login pertama kali
      if (user) {
        return {
          ...token,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000 // 1 jam
        }
      }
      if (account?.provider === 'google') {
        token.isGoogle = true
      }

      // ✅ Token masih valid, langsung return
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // ✅ Token expired → auto refresh via backend
      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.isGoogle = token.isGoogle as boolean
      session.error = token.error as string | undefined // ← expose error ke client
      return session
    }
  },

  pages: {
    signIn: '/login',
    error: '/login'
  },

  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)