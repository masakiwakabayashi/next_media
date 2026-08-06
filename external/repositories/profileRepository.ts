import { supabase } from '@/lib/supabase/client'

export type Author = {
  id: string
  display_name: string
}

export type UserProfile = {
  id: string
  user_id: string | null
  display_name: string
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export async function getUserProfiles(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, user_id, display_name, bio, avatar_url, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user profiles:', error)
    return []
  }

  return data || []
}

export async function getAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name')
    .order('display_name')

  if (error) {
    console.error('Error fetching authors:', error)
    return []
  }

  return data || []
}

export async function getDisplayName(userId: string): Promise<string | null> {
  const { data } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('user_id', userId)
    .single()

  return data?.display_name ?? null
}

export async function updateDisplayName(
  userId: string,
  displayName: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('profiles')
    .update({ display_name: displayName })
    .eq('user_id', userId)

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
