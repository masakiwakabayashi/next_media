import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CategoryPostList from './CategoryPostList'
import { getPostsByCategory, type PostSummary } from '@/external/repositories/postRepository.server'

vi.mock('@/external/repositories/postRepository.server', () => ({
  getPostsByCategory: vi.fn(),
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

describe('CategoryPostList', () => {
  it('カテゴリー名を見出しに表示する', async () => {
    vi.mocked(getPostsByCategory).mockResolvedValue({ posts: [], categoryName: 'ニュース' })

    const jsx = await CategoryPostList({ categorySlug: 'news' })
    render(jsx)

    expect(getPostsByCategory).toHaveBeenCalledWith('news')
    expect(screen.getByRole('heading', { name: 'ニュース' })).toBeInTheDocument()
  })

  it('カテゴリー名が取得できない場合はslugを見出しに表示する', async () => {
    vi.mocked(getPostsByCategory).mockResolvedValue({ posts: [], categoryName: null })

    const jsx = await CategoryPostList({ categorySlug: 'news' })
    render(jsx)

    expect(screen.getByRole('heading', { name: 'news' })).toBeInTheDocument()
  })

  it('記事がない場合は案内文を表示する', async () => {
    vi.mocked(getPostsByCategory).mockResolvedValue({ posts: [], categoryName: 'ニュース' })

    const jsx = await CategoryPostList({ categorySlug: 'news' })
    render(jsx)

    expect(screen.getByText('このカテゴリーの記事はありません')).toBeInTheDocument()
  })

  it('記事一覧を表示する', async () => {
    vi.mocked(getPostsByCategory).mockResolvedValue({ posts: [post], categoryName: 'ニュース' })

    const jsx = await CategoryPostList({ categorySlug: 'news' })
    render(jsx)

    expect(screen.getByRole('link', { name: 'テスト記事' })).toHaveAttribute(
      'href',
      '/posts/test-post'
    )
    expect(screen.getByText('2026年1月15日')).toBeInTheDocument()
    expect(screen.getByText(`${'あ'.repeat(100)}...`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '#グルメ' })).toHaveAttribute('href', '/tags/gourmet')
    expect(screen.getByText('山田太郎')).toBeInTheDocument()
  })
})
