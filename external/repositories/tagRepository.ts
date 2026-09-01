import { supabase } from '@/lib/supabase/client'

export type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type TagWithCount = Tag & {
  postCount: number
}

// 読み取り（サーバーコンポーネントから利用）は tagRepository.server.ts を参照。

export async function createTag(data: {
  name: string
  slug: string
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from('tags').insert(data)
  if (error) return { error: error.message }
  return { error: null }
}

export async function updateTag(
  id: string,
  data: { name: string; slug: string }
): Promise<{ error: string | null }> {
  const { error } = await supabase.from('tags').update(data).eq('id', id)
  if (error) return { error: error.message }
  return { error: null }
}

export async function deleteTag(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) return { error: error.message }
  return { error: null }
}
