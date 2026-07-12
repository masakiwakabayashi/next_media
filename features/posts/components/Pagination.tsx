import Link from 'next/link'

function buildHref(query: string | undefined, page: number): string {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (page > 1) params.set('page', String(page))
  const search = params.toString()
  return search ? `/?${search}` : '/'
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
}: {
  currentPage: number
  totalPages: number
  query?: string
}) {
  if (totalPages <= 1) return null

  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      aria-label="ページネーション"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {hasPrev ? (
        <Link
          href={buildHref(query, currentPage - 1)}
          className="rounded border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
        >
          前へ
        </Link>
      ) : (
        <span className="rounded border border-zinc-100 px-3 py-1.5 text-sm text-zinc-300 dark:border-zinc-900 dark:text-zinc-700">
          前へ
        </span>
      )}

      <span className="text-sm text-zinc-500">
        {currentPage} / {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={buildHref(query, currentPage + 1)}
          className="rounded border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
        >
          次へ
        </Link>
      ) : (
        <span className="rounded border border-zinc-100 px-3 py-1.5 text-sm text-zinc-300 dark:border-zinc-900 dark:text-zinc-700">
          次へ
        </span>
      )}
    </nav>
  )
}
