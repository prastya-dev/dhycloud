import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import '@/styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // ✅ Paksa SW update setiap app load
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => reg.update())
      })

      // ✅ Kalau SW kirim pesan 'SKIP_WAITING', langsung aktifkan
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}