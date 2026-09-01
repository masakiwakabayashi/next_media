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

// 読み取り（サーバーコンポーネントから利用）は profileRepository.server.ts を参照。
// getDisplayName / updateDisplayName はクライアントから呼ばれるためここに残す。

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
