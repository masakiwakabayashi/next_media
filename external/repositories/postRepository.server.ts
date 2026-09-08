// server-side only: ログインユーザーのセッション（Cookie）を引き継ぎ、RLS を
// 適用した状態で posts を読み取るためのリポジトリ。
// クライアントコンポーネントからは import しないこと（next/headers を経由するため）。
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type {
  PostSummary,
  Post,
  PostListResult,
  PostsCursor,
  PostsPage,
  PostMeta,
  PostForEdit,
} from './postRepository'

export type {
  PostSummary,
  Post,
  PostListResult,
  PostsCursor,
  PostsPage,
  PostMeta,
  PostForEdit,
}

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

export const POSTS_PAGE_SIZE = 20

// 無限スクロール用のカーソルページネーション。
// published_at 降順・id 降順で並べ、cursor 以降を pageSize 件返す。
// pageSize + 1 件取得して「次ページがあるか」を判定する。
export async function getPostsPage({
  query,
  cursor,
  pageSize = POSTS_PAGE_SIZE,
}: {
  query?: string
  cursor?: PostsCursor | null
  pageSize?: number
}): Promise<PostsPage> {
  const supabase = await createServerSupabaseClient()

  let builder = supabase
    .from('posts')
    .select(POST_LIST_SELECT)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(pageSize + 1)

  const term = query?.trim()
  if (term) {
    // or() のフィルタ文字列を壊す文字を除去してから部分一致検索する。
    const safe = term.replace(/["\\(),*]/g, ' ').trim()
    if (safe) {
      builder = builder.or(`title.ilike."*${safe}*",content.ilike."*${safe}*"`)
    }
  }

  if (cursor) {
    // (published_at, id) < (cursor.publishedAt, cursor.id) の複合カーソル
    builder = builder.or(
      `published_at.lt."${cursor.publishedAt}",and(published_at.eq."${cursor.publishedAt}",id.lt."${cursor.id}")`
    )
  }

  const { data, error } = await builder

  if (error) {
    console.error('Error fetching posts page:', error)
    return { posts: [], nextCursor: null }
  }

  const rows = data ?? []
  const hasMore = rows.length > pageSize
  const posts = hasMore ? rows.slice(0, pageSize) : rows
  const tail = posts[posts.length - 1]
  const nextCursor =
    hasMore && tail?.published_at
      ? { publishedAt: tail.published_at, id: tail.id }
      : null

  return { posts, nextCursor }
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
