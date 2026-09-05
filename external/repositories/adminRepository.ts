import { supabase } from '@/lib/supabase/client'

export type DashboardStats = {
  publishedCount: number
  draftCount: number
  categoryCount: number
  tagCount: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [published, drafts, categories, tags] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('categories').select('id', { count: 'exact', head: true }),
    supabase.from('tags').select('id', { count: 'exact', head: true }),
  ])

  return {
    publishedCount: published.count ?? 0,
    draftCount: drafts.count ?? 0,
    categoryCount: categories.count ?? 0,
    tagCount: tags.count ?? 0,
  }
}
