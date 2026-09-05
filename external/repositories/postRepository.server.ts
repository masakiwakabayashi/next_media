// server-side only: ログインユーザーのセッション（Cookie）を引き継ぎ、RLS を
// 適用した状態で posts を読み取るためのリポジトリ。
// クライアントコンポーネントからは import しないこと（next/headers を経由するため）。
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type {
  PostSummary,
  Post,
  PostListResult,
  PostMeta,
  PostForEdit,
} from './postRepository'

export type { PostSummary, Post, PostListResult, PostMeta, PostForEdit }

const POST_LIST_SELECT = `
  id,
  title,
  slug,
  image_path,
  content,
  status,
  published_at,
  created_at,
  author:profiles(display_name),
  category:categories(name, slug),
  post_tags(
    tag:tags(id, name, slug)
  )
`

export async function getPosts(
  query?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<PostListResult> {
  const supabase = await createServerSupabaseClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  if (!query) {
    const { data, error, count } = await supabase
      .from('posts')
      .select(POST_LIST_SELECT, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching posts:', error)
      return { posts: [], totalCount: 0 }
    }

    return { posts: data || [], totalCount: count ?? 0 }
  }

  const { data, error } = await supabase
    .from('posts')
    .select(POST_LIST_SELECT)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], totalCount: 0 }
  }

  const lowerQuery = query.toLowerCase()
  const filtered = (data || []).filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
  )

  return { posts: filtered.slice(from, to + 1), totalCount: filtered.length }
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      image_path,
      content,
      google_maps_url,
      status,
      published_at,
      created_at,
      author:profiles(display_name, bio, avatar_url),
      category:categories(name, slug),
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export async function getPostMetaBySlug(slug: string): Promise<PostMeta | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select('title, content, image_path')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getDraftPostForEdit(slug: string): Promise<PostForEdit | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      image_path,
      content,
      status,
      published_at,
      category_id,
      author_id,
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'draft')
    .single()

  if (error) {
    console.error('Error fetching draft post for edit:', error)
    return null
  }

  return data
}

export async function getPublishedPostForEdit(slug: string): Promise<PostForEdit | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      image_path,
      content,
      status,
      published_at,
      category_id,
      author_id,
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching published post for edit:', error)
    return null
  }

  return data
}

export async function getDraftPosts(): Promise<PostSummary[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      image_path,
      content,
      status,
      published_at,
      created_at,
      author:profiles(display_name),
      category:categories(name, slug),
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('status', 'draft')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching draft posts:', error)
    return []
  }

  return data || []
}

export async function getPostsByTag(tagSlug: string): Promise<{ posts: PostSummary[]; tagName: string | null }> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      image_path,
      content,
      status,
      published_at,
      created_at,
      author:profiles(display_name),
      category:categories(name, slug),
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts by tag:', error)
    return { posts: [], tagName: null }
  }

  const allPosts = data || []
  const posts = allPosts.filter((p) =>
    p.post_tags.some((pt) => pt.tag.slug === tagSlug)
  )
  const tagName = posts[0]?.post_tags.find((pt) => pt.tag.slug === tagSlug)?.tag.name ?? null

  return { posts, tagName }
}

export async function getPostsByCategory(categorySlug: string): Promise<{ posts: PostSummary[]; categoryName: string | null }> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      image_path,
      content,
      status,
      published_at,
      created_at,
      author:profiles(display_name),
      category:categories(name, slug),
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('status', 'published')
    .eq('category.slug', categorySlug)
    .not('category', 'is', null)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts by category:', error)
    return { posts: [], categoryName: null }
  }

  const posts = (data || []).filter(
    (p) => p.category?.slug === categorySlug
  )
  const categoryName = posts[0]?.category?.name ?? null

  return { posts, categoryName }
}
