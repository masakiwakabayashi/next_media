import Link from 'next/link'
import { getRecentPosts, getRecentDrafts, RecentPost } from '@/external/repositories/adminRepository'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

type PostRowProps = {
  post: RecentPost
  editHref?: string
}

function PostRow({ post, editHref }: PostRowProps) {
  const date = post.published_at ?? post.created_at

  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {post.title}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {post.category?.name && (
            <span className="mr-2">{post.category.name}</span>
          )}
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
      </div>
      {editHref && (
        <Link
          href={editHref}
          className="shrink-0 rounded border border-zinc-300 px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          編集
        </Link>
      )}
    </li>
  )
}

type SectionProps = {
  title: string
  viewAllHref: string
  children: React.ReactNode
}

function Section({ title, viewAllHref, children }: SectionProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          すべて見る →
        </Link>
      </div>
      {children}
    </div>
  )
}

export default async function RecentPostList() {
  const [recentPosts, recentDrafts] = await Promise.all([
    getRecentPosts(5),
    getRecentDrafts(5),
  ])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="最近の公開記事" viewAllHref="/">
        {recentPosts.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-400">公開記事がありません</p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentPosts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </ul>
        )}
      </Section>

      <Section title="最近の下書き" viewAllHref="/admin/posts/drafts">
        {recentDrafts.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-400">下書きがありません</p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentDrafts.map((post) => (
              <PostRow
                key={post.id}
                post={post}
                editHref={`/admin/posts/drafts/${post.slug}/edit`}
              />
            ))}
          </ul>
        )}
      </Section>
    </div>
  )
}
