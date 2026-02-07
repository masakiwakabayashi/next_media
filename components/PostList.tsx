import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

type Post = {
  id: string
  title: string
  slug: string
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  author: {
    display_name: string
  } | null
  category: {
    name: string
    slug: string
  } | null
}

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      content,
      status,
      published_at,
      created_at,
      author:authors(display_name),
      category:categories(name, slug)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data as unknown as Post[]) || []
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function truncateContent(content: string, maxLength: number = 100): string {
  if (content.length <= maxLength) return content
  return content.slice(0, maxLength) + '...'
}

export default async function PostList() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center text-zinc-500">
        記事がありません
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
        >
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            {post.category && (
              <span className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                {post.category.name}
              </span>
            )}
            {post.published_at && (
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            )}
          </div>

          <Link href={`/posts/${post.slug}`}>
            <h2 className="mb-2 text-xl font-bold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300">
              {post.title}
            </h2>
          </Link>

          <p className="mb-3 text-zinc-600 dark:text-zinc-400">
            {truncateContent(post.content)}
          </p>

          {post.author && (
            <div className="text-sm text-zinc-500">
              {post.author.display_name}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
