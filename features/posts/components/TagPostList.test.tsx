import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TagPostList from './TagPostList'
import { getPostsByTag, type PostSummary } from '@/external/repositories/postRepository.server'

vi.mock('@/external/repositories/postRepository.server', () => ({
  getPostsByTag: vi.fn(),
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
  post_tags: [
    { tag: { id: 't1', name: 'グルメ', slug: 'gourmet' } },
    { tag: { id: 't2', name: 'カフェ', slug: 'cafe' } },
  ],
}

describe('TagPostList', () => {
  it('タグ名を見出しに表示する', async () => {
    vi.mocked(getPostsByTag).mockResolvedValue({ posts: [], tagName: 'グルメ' })

    const jsx = await TagPostList({ tagSlug: 'gourmet' })
    render(jsx)

    expect(getPostsByTag).toHaveBeenCalledWith('gourmet')
    expect(screen.getByRole('heading', { name: '#グルメ' })).toBeInTheDocument()
  })

  it('タグ名が取得できない場合はslugを見出しに表示する', async () => {
    vi.mocked(getPostsByTag).mockResolvedValue({ posts: [], tagName: null })

    const jsx = await TagPostList({ tagSlug: 'gourmet' })
    render(jsx)

    expect(screen.getByRole('heading', { name: '#gourmet' })).toBeInTheDocument()
  })

  it('記事がない場合は案内文を表示する', async () => {
    vi.mocked(getPostsByTag).mockResolvedValue({ posts: [], tagName: 'グルメ' })

    const jsx = await TagPostList({ tagSlug: 'gourmet' })
    render(jsx)

    expect(screen.getByText('このタグの記事はありません')).toBeInTheDocument()
  })

  it('記事一覧とカテゴリー・全タグを表示する', async () => {
    vi.mocked(getPostsByTag).mockResolvedValue({ posts: [post], tagName: 'グルメ' })

    const jsx = await TagPostList({ tagSlug: 'gourmet' })
    render(jsx)

    expect(screen.getByRole('link', { name: 'テスト記事' })).toHaveAttribute(
      'href',
      '/posts/test-post'
    )
    expect(screen.getByRole('link', { name: 'ニュース' })).toHaveAttribute(
      'href',
      '/categories/news'
    )
    expect(screen.getByText('2026年1月15日')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '#グルメ' })).toHaveAttribute('href', '/tags/gourmet')
    expect(screen.getByRole('link', { name: '#カフェ' })).toHaveAttribute('href', '/tags/cafe')
    expect(screen.getByText('山田太郎')).toBeInTheDocument()
  })
})
