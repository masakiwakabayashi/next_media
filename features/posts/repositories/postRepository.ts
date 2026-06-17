import { supabase } from '@/lib/supabase/client'

export type Post = {
  id: string
  title: string
  slug: string
  image_path: string | null
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  author: {
    display_name: string
    bio: string | null
    avatar_url: string | null
  } | null
  category: {
    name: string
    slug: string
  } | null
  post_tags: {
    tag: {
      id: string
      name: string
      slug: string
    }
  }[]
}

export type CreatePostData = {
  title: string
  slug: string
  content: string
  image_path: string | null
  category_id: string | null
  author_id: string
  status: 'draft' | 'published'
  published_at: string | null
}

export async function getPosts(): Promise<Post[]> {
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
      author:authors(display_name),
      category:categories(name, slug),
      post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data as unknown as Post[]) || []
}

export async function getPost(slug: string): Promise<Post | null> {
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
      author:authors(display_name, bio, avatar_url),
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

  return data as unknown as Post
}

export type PostForEdit = {
  id: string
  title: string
  slug: string
  image_path: string | null
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  category_id: string | null
  author_id: string
  post_tags: {
    tag: {
      id: string
      name: string
      slug: string
    }
  }[]
}

export async function getDraftPostForEdit(slug: string): Promise<PostForEdit | null> {
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

  return data as unknown as PostForEdit
}

export async function updatePost(id: string, data: Partial<CreatePostData>): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('posts')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}

export async function updatePostTags(postId: string, tagIds: string[]): Promise<{ error: string | null }> {
  const { error: deleteError } = await supabase
    .from('post_tags')
    .delete()
    .eq('post_id', postId)

  if (deleteError) {
    return { error: deleteError.message }
  }

  if (tagIds.length > 0) {
    const postTags = tagIds.map((tagId) => ({ post_id: postId, tag_id: tagId }))
    const { error: insertError } = await supabase.from('post_tags').insert(postTags)

    if (insertError) {
      return { error: insertError.message }
    }
  }

  return { error: null }
}

export async function getDraftPosts(): Promise<Post[]> {
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
      author:authors(display_name),
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

  return (data as unknown as Post[]) || []
}

export async function getPostsByTag(tagSlug: string): Promise<{ posts: Post[]; tagName: string | null }> {
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
      author:authors(display_name),
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

  const allPosts = (data as unknown as Post[]) || []
  const posts = allPosts.filter((p) =>
    p.post_tags.some((pt) => pt.tag.slug === tagSlug)
  )
  const tagName = posts[0]?.post_tags.find((pt) => pt.tag.slug === tagSlug)?.tag.name ?? null

  return { posts, tagName }
}

export async function getPostsByCategory(categorySlug: string): Promise<{ posts: Post[]; categoryName: string | null }> {
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
      author:authors(display_name),
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

  const posts = ((data as unknown as Post[]) || []).filter(
    (p) => p.category?.slug === categorySlug
  )
  const categoryName = posts[0]?.category?.name ?? null

  return { posts, categoryName }
}

export async function createPost(data: CreatePostData): Promise<{ data: { id: string } | null; error: string | null }> {
  const { data: post, error } = await supabase
    .from('posts')
    .insert(data)
    .select('id')
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: post, error: null }
}

export async function attachTagsToPost(postId: string, tagIds: string[]): Promise<{ error: string | null }> {
  const postTags = tagIds.map((tagId) => ({
    post_id: postId,
    tag_id: tagId,
  }))

  const { error } = await supabase.from('post_tags').insert(postTags)

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
