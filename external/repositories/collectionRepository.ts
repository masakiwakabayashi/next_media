// server-side only: サーバーコンポーネントからのみ利用。ログインユーザーの
// セッション（Cookie）を引き継ぎ、RLS を適用した状態で collections を読み取る。
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type Collection = {
  id: string
  title: string
  slug: string
  description: string | null
  image_path: string | null
  published_at: string | null
}

export type CollectionPost = {
  position: number
  post: {
    id: string
    title: string
    slug: string
    image_path: string | null
    content: string
    published_at: string | null
    category: {
      name: string
      slug: string
    } | null
  }
}

export async function getCollections(): Promise<Collection[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('collections')
    .select('id, title, slug, description, image_path, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching collections:', error)
    return []
  }

  return data || []
}

export async function getCollection(
  slug: string
): Promise<{ collection: Collection | null; posts: CollectionPost['post'][] }> {
  const supabase = await createServerSupabaseClient()
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('id, title, slug, description, image_path, published_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (collectionError || !collection) {
    console.error('Error fetching collection:', collectionError)
    return { collection: null, posts: [] }
  }

  const { data: collectionPosts, error: postsError } = await supabase
    .from('collection_posts')
    .select(
      `
      position,
      post:posts(
        id,
        title,
        slug,
        image_path,
        content,
        published_at,
        category:categories(name, slug)
      )
    `
    )
    .eq('collection_id', collection.id)
    .order('position', { ascending: true })

  if (postsError) {
    console.error('Error fetching collection posts:', postsError)
    return { collection, posts: [] }
  }

  const posts = (collectionPosts || [])
    .map((cp) => cp.post)
    .filter(Boolean)

  return { collection, posts }
}
