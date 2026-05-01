import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    setLoading(false)

    if (res?.error) {
      setError('Email atau password salah')
      return
    }

    router.replace('/boards')
  }

  return (
    <>
      <Head><title>Login — DhyCloud</title></Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-6">
        <div>
         
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full">
               
         
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Masuk</h1>
          <p className="text-sm text-gray-400 mb-6">Selamat datang kembali</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="budi@email.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-800 transition disabled:opacity-60"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          {/* <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">atau</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
          disabled
            onClick={() => signIn('google', { callbackUrl: '/boards' })}
            className="cursor-not-allowed w-full border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Masuk dengan Google
          </button> */}

          <p className="text-center text-sm text-gray-400 mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-600 font-medium">
              Daftar
            </Link>
          </p>
        </div>
        <p className="text-xs text-gray-300 text-center mt-6 tracking-wide">
  © prastya-dev
</p>
      </div>
    </>
  )
}