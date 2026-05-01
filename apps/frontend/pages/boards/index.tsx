import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import api from '@/lib/axios'
import { runTemplate } from '@/lib/boardTemplate'
import { Board } from '@/types'

export default function BoardsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [Id, setId] = useState('')
  const [creating, setCreating] = useState(false)
  const [useId, setUseID] = useState(false)
  const [showFormId, setShowFormId] = useState(false)
  const [error, setError] = useState('')
  const [templateStatus, setTemplateStatus] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }

    if (status === 'authenticated') {
      if (session?.error === 'RefreshAccessTokenError') {
        router.replace('/login')
        return
      }
      if (session?.accessToken) {
        localStorage.setItem('accessToken', session.accessToken)
      }
      if (session?.refreshToken) {
        localStorage.setItem('refreshToken', session.refreshToken)
      }
      fetchBoards()
    }
  }, [status, session])

  const fetchBoards = async () => {
    try {
      const res = await api.get('/boards')
      setBoards(res.data.data)
    } catch {
      setError('Gagal memuat boards')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    if (!confirm('Yakin ingin keluar?')) return
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    await signOut({ callbackUrl: '/login' })
  }

  const handleCreate = async () => {
    if (!title.trim()) return
    setCreating(true)
    setError('')
    setTemplateStatus('')

    try {
      // Step 1: Buat board
      setTemplateStatus('Membuat board...')
     const res = await api.post('/boards', {
  title: title.trim(),
  isTemplate: useId && !!Id.trim(),   // ✅ true kalau pakai template
  templateId: useId ? Id.trim() : null // ✅ simpan id template
})
      const newBoard = res.data.data

      // Step 2: Jalankan template kalau diaktifkan
      if (useId && Id.trim()) {
        try {
          setTemplateStatus('Memuat template...')
          await runTemplate(Id.trim(), newBoard.id, setTemplateStatus)
        } catch (templateErr: any) {
          // Board sudah terbuat, template gagal — tetap tampil boardnya
          await fetchBoards()
          setShowFormId(false)
          setTitle('')
          setId('')
          setUseID(false)
          setError(`Board dibuat tapi template gagal: ${templateErr.message}`)
          return
        }
      }

      // Step 3: Refresh list board
      await fetchBoards()

      // Reset form
      setShowFormId(false)
      setTitle('')
      setId('')
      setUseID(false)
      setTemplateStatus('')

    } catch (err: any) {
      setError(err.message || 'Gagal membuat board')
    } finally {
      setCreating(false)
      setTemplateStatus('')
    }
  }

  const handleDelete = async (boardId: string) => {
    if (!confirm('Hapus board ini? Semua list dan card akan ikut terhapus.')) return
    try {
      await api.delete(`/boards/${boardId}`)
      setBoards(prev => prev.filter(b => b.id !== boardId))
    } catch {
      setError('Gagal menghapus board')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Memuat...
        </div>
      </div>
    )
  }

  return (
    <>
      <Head><title>Boards — DhyCloud</title></Head>
      <div className="min-h-screen bg-gray-50">

        {/* Loading overlay saat membuat board / import template */}
        {creating && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-xs w-full mx-4">
              <div className="flex justify-center mb-4">
                <svg className="animate-spin w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {templateStatus || 'Membuat board...'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Mohon tunggu sebentar</p>
            </div>
          </div>
        )}

        {/* Navbar */}
        <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/icons/icon-512x512.png"
              alt="DhyCloud"
              className="w-7 h-7 rounded-lg object-cover"
            />
            <span className="font-semibold text-gray-900">DhyCloud</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Keluar
            </button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Boards kamu</h1>
              <p className="text-sm text-gray-400 mt-0.5">{boards.length} board</p>
            </div>
            <button
              onClick={() => { setShowFormId(true); setError('') }}
              className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-800 transition"
            >
              + Buat board
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 ml-2">×</button>
            </div>
          )}

          {/* Form buat board */}
          {showFormId && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-3">Nama board baru</p>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !useId && handleCreate()}
                placeholder="Contoh: Project Website"
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-3"
              />

              {/* Toggle template */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => { setUseID(prev => !prev); setId('') }}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${useId ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${useId ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
                <span className="text-sm text-gray-600">Gunakan ID template</span>
              </div>

              {/* Input ID template */}
              {useId && (
                <div className="mb-3">
                  <input
                    type="text"
                    value={Id}
                    onChange={e => setId(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCreate()}
                    placeholder="Contoh: edlink-notif"
                    autoFocus
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1.5 ml-1">
                    Template tersedia: <span className="font-mono text-blue-500">edlink-notif</span>
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  disabled={creating || !(title.trim() && (!useId || Id.trim()))}
                  className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-800 transition disabled:opacity-60"
                >
                  {creating ? 'Membuat...' : 'Buat'}
                </button>
                <button
                  onClick={() => { setShowFormId(false); setTitle(''); setId(''); setUseID(false); setError('') }}
                  className="text-sm text-gray-400 px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Grid boards */}
          {boards.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gray-500 text-sm">Belum ada board.</p>
              <p className="text-gray-400 text-sm mt-1">Klik "Buat board" untuk mulai.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {boards.map(board => (
                <div
                  key={board.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {board.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(board.id)}
                      className="text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100 text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <Link href={`/boards/${board.id}`}>
                    <h2 className="font-medium text-gray-900 mb-1 hover:text-blue-700 transition cursor-pointer">
                      {board.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-400">
                      {board._count?.lists ?? 0} list
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">
                      {board._count?.members ?? 0} member
                    </span>
                   {board.isTemplate && (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
 
    {board.templateId}
  </span>
)}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}