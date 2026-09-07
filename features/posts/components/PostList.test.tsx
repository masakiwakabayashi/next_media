import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostList from './PostList'
import { getPosts, type PostSummary } from '@/external/repositories/postRepository.server'

vi.mock('@/external/repositories/postRepository.server', () => ({
  getPosts: vi.fn(),
}))

const post: PostSummary = {
  id: 'p1',
  title: 'テスト記事',
  slug: 'test-post',
  image_path: null,
  content: 'あ'.repeat(120),
  status: 'published',
  published_at: '2026-01-15T00:00:00.000Z',
  created_at: '2026-01-15T00:00:00.000Z',
  author: { display_name: '山田太郎' },
  category: { name: 'ニュース', slug: 'news' },
  post_tags: [{ tag: { id: 't1', name: 'グルメ', slug: 'gourmet' } }],
}

describe('PostList', () => {
  it('クエリなしで記事がない場合は案内文を表示する', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: [], totalCount: 0 })

    const jsx = await PostList({})
    render(jsx)

    expect(getPosts).toHaveBeenCalledWith(undefined, 1, 20)
    expect(screen.getByText('記事がありません')).toBeInTheDocument()
  })

  it('検索クエリありで記事がない場合はキーワードを含む案内文を表示する', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: [], totalCount: 0 })

    const jsx = await PostList({ query: 'キーワード', page: 2 })
    render(jsx)

    expect(getPosts).toHaveBeenCalledWith('キーワード', 2, 20)
    expect(screen.getByText('「キーワード」に一致する記事がありません')).toBeInTheDocument()
  })

  it('記事一覧とページネーションを表示する', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: [post], totalCount: 45 })

    const jsx = await PostList({ page: 2 })
    render(jsx)

    expect(screen.getByRole('link', { name: 'テスト記事' })).toHaveAttribute(
      'href',
      '/posts/test-post'
    )
    expect(screen.getByText('ニュース')).toBeInTheDocument()
    expect(screen.getByText('2026年1月15日')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '#グルメ' })).toHaveAttribute('href', '/tags/gourmet')
    expect(screen.getByText('山田太郎')).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })
})
