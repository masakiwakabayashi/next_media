'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthProvider'

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!isAdmin) router.replace('/')
  }, [loading, isAdmin, router])

  if (loading || !isAdmin) {
    return (
      <div className="py-20 text-center text-sm text-zinc-500 dark:text-zinc-400">
        権限を確認しています...
      </div>
    )
  }

  return <>{children}</>
}
