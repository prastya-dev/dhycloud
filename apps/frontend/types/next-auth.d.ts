import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    isGoogle: boolean
    error?: string  // ← tambah ini
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    accessTokenExpires: number  // ← tambah ini
    isGoogle?: boolean
    error?: string
  }
}