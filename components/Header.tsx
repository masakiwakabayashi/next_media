'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthProvider'

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      await signOut()
      router.refresh()
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-16 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Next Media
        </Link>
        <div className="flex items-center gap-4">
          {!loading && user && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </span>
          )}
          {!loading && (
            user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
              >
                ログアウト
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
              >
                ログイン
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  )
}
