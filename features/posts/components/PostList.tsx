'use client'

import { useEffect, useRef } from 'react'
import { usePostsInfinite } from '../hooks/usePostsInfinite'
import PostCard from './PostCard'

export default function PostList({ query }: { query?: string }) {
  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePostsInfinite(query)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage()
        }
      },
      { rootMargin: '400px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isPending) {
    return <div className="py-8 text-center text-zinc-500">読み込み中...</div>
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        記事の読み込みに失敗しました
      </div>
    )
  }

  const posts = data.pages.flatMap((page) => page.posts)

  if (posts.length === 0) {
    return (
      <div className="text-center text-zinc-500">
        {query ? `「${query}」に一致する記事がありません` : '記事がありません'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={sentinelRef} aria-hidden="true" />

      {isFetchingNextPage && (
        <div className="py-4 text-center text-sm text-zinc-500">
          読み込み中...
        </div>
      )}
      {!hasNextPage && (
        <div className="py-4 text-center text-sm text-zinc-400">
          すべての記事を表示しました
        </div>
      )}
    </div>
  )
}
