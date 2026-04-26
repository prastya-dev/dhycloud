import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

type InstallState = 'checking' | 'already-installed' | 'can-install' | 'manual'

export default function InstallPage() {
  const router = useRouter()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [installState, setInstallState] = useState<InstallState>('checking')
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    // cek apakah sudah jalan sebagai PWA (standalone)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    if (isStandalone) {
      // sudah install dan dibuka dari icon → redirect langsung
      router.replace('/')
      return
    }

    // cek apakah pernah di-install sebelumnya (flag di localStorage)
    const wasInstalled = localStorage.getItem('pwa-installed') === 'true'
    if (wasInstalled) {
      setInstallState('already-installed')
      return
    }

    // tangkap event install dari browser
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setInstallState('can-install')
    }

    window.addEventListener('beforeinstallprompt', handler)

    // kalau sudah berhasil install
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('pwa-installed', 'true')
      setInstallState('already-installed')
    })

    // 3 detik tidak ada prompt → tampilkan panduan manual
    const timer = setTimeout(() => {
      setInstallState((prev) =>
        prev === 'checking' ? 'manual' : prev
      )
    }, 3000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    setIsInstalling(true)
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true')
      setInstallState('already-installed')
    }
    setDeferredPrompt(null)
    setIsInstalling(false)
  }

  const handleOpenApp = () => {
    // kalau sudah login → ke boards, belum login → ke login
    router.push('/login')
  }

  const isIOS = typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent)

  return (
    <>
      <Head><title>Install DhyCloud</title></Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full text-center">

          {/* Icon */}
        {/* Icon */}
<div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-6">
  <img
    src="/icons/icon-512x512.png"
    alt="DhyCloud"
    className="w-full h-full object-cover"
  />
</div>

          {/* <h1 className="text-xl font-semibold text-gray-900 mb-2">DhyCloud</h1> */}
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Project management app — kelola task, deadline, dan tim kamu.
          </p>

          {/* === SUDAH INSTALL === */}
          {installState === 'already-installed' && (
            <div className="space-y-3">
              <div className="bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3 font-medium">
                ✅ Aplikasi sudah terinstall
              </div>
              <button
                onClick={handleOpenApp}
                className="w-full bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-800 active:bg-blue-900 transition"
              >
                Buka aplikasi →
              </button>
            </div>
          )}

          {/* === BISA INSTALL (Chrome/Edge/Android) === */}
          {installState === 'can-install' && (
            <div className="space-y-3">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="w-full bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-800 active:bg-blue-900 transition disabled:opacity-60"
              >
                {isInstalling ? 'Menginstall...' : 'Install sekarang'}
              </button>
              <button
                onClick={() => router.push('/login')}
                className="w-full text-gray-400 text-sm hover:text-gray-600 transition py-1"
              >
                Lanjut tanpa install →
              </button>
            </div>
          )}

          {/* === PANDUAN MANUAL (iOS / Firefox) === */}
          {installState === 'manual' && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 text-left">
                <p className="text-sm font-medium text-blue-800 mb-3">
                  Cara install:
                </p>
                {isIOS ? (
                  <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Tap tombol <strong>Share</strong> di Safari</li>
                    <li>Pilih <strong>"Add to Home Screen"</strong></li>
                    <li>Tap <strong>"Add"</strong></li>
                  </ol>
                ) : (
                  <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Klik ikon <strong>⋮</strong> di pojok kanan browser</li>
                    <li>Pilih <strong>"Install App"</strong></li>
                    <li>Klik <strong>"Install"</strong></li>
                  </ol>
                )}
              </div>
              <button
                onClick={() => router.push('/login')}
                className="w-full text-gray-400 text-sm hover:text-gray-600 transition py-1"
              >
                Lanjut tanpa install →
              </button>
            </div>
          )}

          {/* === CHECKING (loading awal) === */}
          {installState === 'checking' && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Menyiapkan...
            </div>
          )}

        </div>
      </div>
    </>
  )
}