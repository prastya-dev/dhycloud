import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

type InstallState = 'checking' | 'already-installed' | 'can-install' | 'manual'

export default function InstallPage() {
  const router = useRouter()
  const [deferredPrompt, setDeferredPrompt] = useState<unknown>(null)
  const [installState, setInstallState] = useState<InstallState>('checking')
  const [isInstalling, setIsInstalling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    const mobile = /android|iphone|ipad|ipod|mobile/i.test(ua)
    const ios = /iphone|ipad|ipod/i.test(ua)
    setIsMobile(mobile)
    setIsIOS(ios)

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone === true

    if (isStandalone) {
      router.replace('/')
      return
    }

    const wasInstalled = localStorage.getItem('pwa-installed') === 'true'
    if (wasInstalled) {
      setInstallState('already-installed')
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setInstallState('can-install')
    }

    window.addEventListener('beforeinstallprompt', handler)

    window.addEventListener('appinstalled', () => {
      localStorage.setItem('pwa-installed', 'true')
      setInstallState('already-installed')
    })

    const timer = setTimeout(() => {
      setInstallState((prev) => (prev === 'checking' ? 'manual' : prev))
    }, 3000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(timer)
    }
  }, [router])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    setIsInstalling(true)
    const prompt = deferredPrompt as { prompt: () => void; userChoice: Promise<{ outcome: string }> }
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true')
      setInstallState('already-installed')
    }
    setDeferredPrompt(null)
    setIsInstalling(false)
  }

  return (
    <>
      <Head><title>Install DhyCloud</title></Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full text-center">

          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-6">
            <img
              src="/icons/icon-512x512.png"
              alt="DhyCloud"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Project management app — kelola task, deadline, dan tim kamu.
          </p>

         {/* === SUDAH INSTALL === */}
{installState === 'already-installed' && (
  <div className="bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3 font-medium text-center space-y-1">
    <p>✅ Aplikasi sudah terinstall</p>
    <p className="font-normal text-green-600">
      Buka dari home screen, lalu refresh halaman ini.
    </p>
  </div>
)}

          {/* === BISA INSTALL (Chrome/Edge/Android) === */}
          {installState === 'can-install' && (
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-800 active:bg-blue-900 transition disabled:opacity-60"
            >
              {isInstalling ? 'Menginstall...' : 'Install sekarang'}
            </button>
          )}

          {/* === PANDUAN MANUAL === */}
          {installState === 'manual' && (
            <div className="bg-blue-50 rounded-xl p-4 text-left">
              <p className="text-sm font-medium text-blue-800 mb-3">
                Cara install:
              </p>

              {/* iOS (Safari) */}
              {isIOS && (
                <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Tap tombol <strong>Share</strong> di Safari</li>
                  <li>Pilih <strong>&quot;Add to Home Screen&quot;</strong></li>
                  <li>Tap <strong>&quot;Add&quot;</strong></li>
                </ol>
              )}

              {/* Android / Mobile non-iOS */}
              {!isIOS && isMobile && (
                <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Tap ikon <strong>⋮</strong> di pojok kanan browser</li>
                  <li>Pilih <strong>&quot;Install App&quot;</strong> atau <strong>&quot;Add to Home Screen&quot;</strong></li>
                  <li>Tap <strong>&quot;Install&quot;</strong></li>
                </ol>
              )}

              {/* Desktop (Chrome / Edge) */}
              {!isMobile && (
                <div className="space-y-3">
                  <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>
                      Lihat pojok kanan atas browser, klik ikon{' '}
                      <strong>Install</strong>{' '}
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded text-blue-700 text-xs font-bold">↓</span>
                    </li>
                    <li>Klik <strong>&quot;Install&quot;</strong> pada dialog yang muncul</li>
                  </ol>

                  {/* Visual hint untuk desktop */}
                  <div className="mt-3 border border-blue-200 rounded-lg overflow-hidden">
                    <div className="bg-blue-100 px-3 py-2 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 bg-white rounded px-2 py-0.5 text-xs text-gray-400 truncate">
                        dhycloud.app
                      </div>
                      {/* Tombol install di pojok kanan */}
                      <div className="flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-medium">
                        <span>↓</span>
                        <span>Install</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 text-center py-2 bg-white">
                      Klik tombol di pojok kanan address bar ↑
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === CHECKING === */}
          {installState === 'checking' && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Menyiapkan...
            </div>
          )}

        </div>
      </div>
    </>
  )
}
