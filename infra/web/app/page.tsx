'use client'

import { useRouter, redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  redirect('/pages/login')

  return <h1>Redirecting...</h1>
}