'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  displayName: string | null
  refreshDisplayName: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  async function fetchDisplayName(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('user_id', userId)
      .single()
    setDisplayName(data?.display_name ?? null)
  }

  useEffect(() => {
    if (!session?.user) {
      setDisplayName(null)
      return
    }
    fetchDisplayName(session.user.id)
  }, [session?.user?.id])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      isAdmin: session?.user?.app_metadata?.role === 'admin',
      displayName,
      refreshDisplayName: async () => {
        if (session?.user) await fetchDisplayName(session.user.id)
      },
      signOut: async () => {
        await supabase.auth.signOut()
      },
    }),
    [session, loading, displayName]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
