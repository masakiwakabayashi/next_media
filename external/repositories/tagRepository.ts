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

export async function getTags(): Promise<TagWithCount[]> {
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
    postCount: (tag.post_tags as unknown as { count: number }[])?.[0]?.count ?? 0,
  }))
}

export async function getTagOptions(): Promise<Tag[]> {
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
