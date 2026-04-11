import { supabase } from '@/lib/supabase/client'

export type DashboardStats = {
  publishedCount: number
  draftCount: number
  categoryCount: number
  tagCount: number
}

export type RecentPost = {
  id: string
  title: string
  slug: string
  published_at: string | null
  created_at: string
  status: 'draft' | 'published'
  category: { name: string } | null
  author: { display_name: string } | null
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

export async function getRecentPosts(limit = 5): Promise<RecentPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      published_at,
      created_at,
      status,
      category:categories(name),
      author:authors(display_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }

  return (data as unknown as RecentPost[]) || []
}

export async function getRecentDrafts(limit = 5): Promise<RecentPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      published_at,
      created_at,
      status,
      category:categories(name),
      author:authors(display_name)
    `)
    .eq('status', 'draft')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent drafts:', error)
    return []
  }

  return (data as unknown as RecentPost[]) || []
}
