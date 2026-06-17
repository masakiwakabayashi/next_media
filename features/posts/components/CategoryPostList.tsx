import Link from 'next/link'
import PostThumbnail from './PostThumbnail'
import { getPostsByCategory } from '../repositories/postRepository'

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

export default async function CategoryPostList({ categorySlug }: { categorySlug: string }) {
  const { posts, categoryName } = await getPostsByCategory(categorySlug)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {categoryName ?? categorySlug}
      </h1>

      {posts.length === 0 ? (
        <div className="py-8 text-center text-zinc-500">
          このカテゴリーの記事はありません
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <PostThumbnail src={post.image_path} alt={post.title} />

              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
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

              {post.post_tags && post.post_tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {post.post_tags.map((pt) => (
                    <Link
                      key={pt.tag.id}
                      href={`/tags/${pt.tag.slug}`}
                      className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:text-zinc-300"
                    >
                      #{pt.tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {post.author && (
                <div className="text-sm text-zinc-500">
                  {post.author.display_name}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
