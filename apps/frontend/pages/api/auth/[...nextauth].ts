import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

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
            {
              email: credentials?.email,
              password: credentials?.password
            }
          )

          const { accessToken, refreshToken } = res.data

          if (accessToken) {
            return {
              id: 'user',
              accessToken,
              refreshToken
            }
          }
          return null
        } catch {
          return null
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = (user as any).accessToken
        token.refreshToken = (user as any).refreshToken
      }
      if (account?.provider === 'google') {
        token.isGoogle = true
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.isGoogle = token.isGoogle as boolean
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