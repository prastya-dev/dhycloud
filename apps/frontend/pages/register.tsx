import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import swal from 'sweetalert'
import { Eye, EyeOff, Cloud } from 'lucide-react'

const NAVY = '#1B2A4A'
const CREAM_BG = '#F5F0E8'
const CREAM_CARD = '#FDFAF4'

const globalStyles = `
  .inp {
    width: 100%;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 14px;
    outline: none;
    transition: border-color .15s, box-shadow .15s;
    background: #F5F0E8;
    border: 1px solid #D4C9B5;
    color: #1B2A4A;
  }
  .inp::placeholder { color: #B5A99A; }
  .inp:focus {
    border-color: #1B2A4A;
    box-shadow: 0 0 0 3px rgba(27, 42, 74, 0.1);
  }
  .inp.pr { padding-right: 44px; }
  .inp.match { border-color: #7AAA8A; }
  .inp.match:focus { border-color: #7AAA8A; box-shadow: 0 0 0 3px rgba(122,170,138,0.15); }
  .inp.mismatch { border-color: #C08080; }
  .inp.mismatch:focus { border-color: #C08080; box-shadow: 0 0 0 3px rgba(192,128,128,0.15); }
`

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const getStrength = () => {
    if (!password) return null
    if (password.length < 6) return { w: '25%', color: '#9B3B3B', label: 'Terlalu pendek — min. 6 karakter' }
    if (password.length < 8) return { w: '50%', color: '#C07A00', label: 'Cukup, tapi bisa lebih kuat' }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { w: '100%', color: '#3B6B4A', label: 'Password sangat kuat' }
    return { w: '70%', color: '#3B6B4A', label: 'Password kuat' }
  }

  const strength = getStrength()
  const passwordsMatch = !!confirmPassword && password === confirmPassword
  const passwordMismatch = !!confirmPassword && password !== confirmPassword
  const isValid = !!name.trim() && !!email.trim() && password.length >= 6 && password === confirmPassword

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setError('')

    const confirm = await swal({
      title: 'Konfirmasi Data',
      text: `Apakah data sudah benar?`,
      icon: 'info',
      buttons: ['Ubah', 'Ya, Daftar!'],
    })
    if (!confirm) return

    setLoading(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/regist`, { name, email, password })
      await swal({ title: 'Registrasi Berhasil!', text: `Selamat datang ${name}, silakan login.`, icon: 'success' })
      router.replace('/login')
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal mendaftar'
      setError(msg)
      swal({ title: 'Registrasi Gagal', text: msg, icon: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const labelClass = 'block text-xs font-medium uppercase tracking-widest mb-1.5'
  const labelStyle = { color: '#7A6E5F' }

  return (
    <>
      <Head><title>Daftar — DhyCloud</title></Head>
      <style>{globalStyles}</style>

      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: CREAM_BG }}>
        <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: CREAM_CARD, border: '1px solid #E2D9C8' }}>

          {/* Header navy */}
          <div className="px-8 pt-7 pb-6" style={{ background: NAVY }}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg"
                style={{ border: '1.5px solid rgba(245,240,232,0.35)' }}>
                <Cloud size={16} color="#C9BFA8" />
              </div>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#C9BFA8' }}>
                DhyCloud
              </span>
            </div>
            <h1 className="text-xl font-medium mb-1" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif' }}>
              Buat akun
            </h1>
            <p className="text-sm" style={{ color: '#8A9AB8' }}>Daftarkan diri Anda untuk memulai</p>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
            {error && (
              <div className="text-xs rounded-lg px-4 py-2.5"
                style={{ background: '#F5EBE8', color: '#7A2E2E', border: '1px solid #E2C4BC' }}>
                {error}
              </div>
            )}

            {/* Nama */}
            <div>
              <label className={labelClass} style={labelStyle}>Nama lengkap</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Budi Santoso"
                className="inp"
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass} style={labelStyle}>Alamat email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="budi@email.com"
                required
                className="inp"
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelClass} style={labelStyle}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  required
                  className="inp pr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition"
                  style={{ color: '#9A8E7E' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && (
                <>
                  <div className="mt-2 h-0.5 rounded-full overflow-hidden" style={{ background: '#E2D9C8' }}>
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{ width: strength.w, background: strength.color }} />
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: strength.color }}>{strength.label}</p>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={labelClass} style={labelStyle}>Konfirmasi password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                required
                className={`inp ${passwordMismatch ? 'mismatch' : passwordsMatch ? 'match' : ''}`}
              />
              {passwordMismatch && <p className="text-xs mt-1.5" style={{ color: '#9B3B3B' }}>Password tidak cocok</p>}
              {passwordsMatch && <p className="text-xs mt-1.5" style={{ color: '#3B6B4A' }}>Password cocok</p>}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !isValid}
                className="w-full rounded-xl py-3 text-sm font-medium transition active:scale-95 disabled:cursor-not-allowed"
                style={{
                  background: isValid && !loading ? NAVY : '#9A8E7E',
                  color: '#F5F0E8',
                  letterSpacing: '.02em',
                }}
              >
                {loading ? 'Memproses...' : 'Buat akun'}
              </button>
            </div>

            <p className="text-center text-sm pt-1" style={{ color: '#9A8E7E' }}>
              Sudah punya akun?{' '}
              <Link href="/login" className="font-medium"
                style={{ color: NAVY, borderBottom: '1px solid #C9BFA8' }}>
                Masuk
              </Link>
            </p>
          </form>

        </div>
      </div>
    </>
  )
}