// server-side only: ログインユーザーのセッション（Cookie）を引き継ぎ、RLS を
// 適用した状態で tags を読み取るためのリポジトリ。
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Tag, TagWithCount } from './tagRepository'

export type { Tag, TagWithCount }

export async function getTags(): Promise<TagWithCount[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, created_at, post_tags(count)')
    .order('name')

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  return (data || []).map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    created_at: tag.created_at,
    postCount: tag.post_tags?.[0]?.count ?? 0,
  }))
}

export async function getTagOptions(): Promise<Tag[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, created_at')
    .order('name')

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  return data || []
}
