import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    if (!isStandalone) {
      router.replace('/install')
      return
    }

    if (session) {
      router.replace('/boards')
    } else {
      router.replace('/login')
    }
  }, [status, session])

  return null
}