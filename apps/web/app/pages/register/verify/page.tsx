'use client'
import { useState } from 'react'
import Link from 'next/link'
// ✏️ Ganti fungsi ini dengan implementasi backend kamu
async function loginUser(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Login gagal')
  return res.json()
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginUser(email, password)
      // ✏️ Redirect setelah login, misal: router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-sm bg-white border shadow-xl border-gray-200 rounded-2xl p-6 sm:p-8">

<div className='w-full h-auto flex items-center justify-center'>
<span className="w-[45%] p-5 font-bold h-9 rounded-lg text-gray-900 text-2xl mb-4 flex items-center gap-1.5 justify-center">  
  DhyCloud
 

</span>
</div>

        {/* Tab navigasi */}
        {/* <div className="flex border-b border-gray-200 mb-6">
          <span className="flex-1 text-center pb-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900">
            Masuk
          </span>
         
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <h1>Kode Otp sudah dikirimn ke alamt email : </h1>
            </div>
          <div>
            <input
              type="text" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="masukan otp"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors">
            {loading ? 'Memuat...' : 'Verify'}
          </button>
        </form>

       

        <p className="text-center text-xs text-gray-400 mt-6">
          belum menerima kode?{' '}
          <Link href="/pages/register" className="text-gray-600 underline">Kirim Ulang</Link>
        </p>
      </div>
    </main>
  )
}
