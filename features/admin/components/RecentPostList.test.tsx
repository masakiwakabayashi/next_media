import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RecentPostList from './RecentPostList'
import {
  getRecentPosts,
  getRecentDrafts,
  type RecentPost,
} from '@/external/repositories/adminRepository'

vi.mock('@/external/repositories/adminRepository', () => ({
  getRecentPosts: vi.fn(),
  getRecentDrafts: vi.fn(),
}))

const publishedPost: RecentPost = {
  id: 'p1',
  title: '公開された記事',
  slug: 'published-post',
  published_at: '2026-03-15T00:00:00.000Z',
  created_at: '2026-03-01T00:00:00.000Z',
  status: 'published',
  category: { name: 'グルメ' },
  author: { display_name: '山田' },
}

const draftPost: RecentPost = {
  id: 'd1',
  title: '下書きの記事',
  slug: 'draft-post',
  published_at: null,
  created_at: '2026-03-10T00:00:00.000Z',
  status: 'draft',
  category: null,
  author: { display_name: '鈴木' },
}

describe('RecentPostList', () => {
  it('公開記事と下書きの見出しとタイトルを表示する', async () => {
    vi.mocked(getRecentPosts).mockResolvedValue([publishedPost])
    vi.mocked(getRecentDrafts).mockResolvedValue([draftPost])

    const jsx = await RecentPostList()
    render(jsx)

    expect(screen.getByRole('heading', { name: '最近の公開記事' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '最近の下書き' })).toBeInTheDocument()
    expect(screen.getByText('公開された記事')).toBeInTheDocument()
    expect(screen.getByText('下書きの記事')).toBeInTheDocument()
    expect(screen.getByText('グルメ')).toBeInTheDocument()
  })

  it('下書きには編集リンクを表示し、公開記事には表示しない', async () => {
    vi.mocked(getRecentPosts).mockResolvedValue([publishedPost])
    vi.mocked(getRecentDrafts).mockResolvedValue([draftPost])

    const jsx = await RecentPostList()
    render(jsx)

    const editLinks = screen.getAllByRole('link', { name: '編集' })
    expect(editLinks).toHaveLength(1)
    expect(editLinks[0]).toHaveAttribute(
      'href',
      '/admin/posts/drafts/draft-post/edit'
    )
  })

  it('公開記事はpublished_atを、下書きはcreated_atを日付に使う', async () => {
    vi.mocked(getRecentPosts).mockResolvedValue([publishedPost])
    vi.mocked(getRecentDrafts).mockResolvedValue([draftPost])

    const jsx = await RecentPostList()
    render(jsx)

    const times = screen.getAllByRole('time')
    expect(times[0]).toHaveAttribute('datetime', publishedPost.published_at)
    expect(times[1]).toHaveAttribute('datetime', draftPost.created_at)
  })

  it('データがない場合は空表示メッセージを表示する', async () => {
    vi.mocked(getRecentPosts).mockResolvedValue([])
    vi.mocked(getRecentDrafts).mockResolvedValue([])

    const jsx = await RecentPostList()
    render(jsx)

    expect(screen.getByText('公開記事がありません')).toBeInTheDocument()
    expect(screen.getByText('下書きがありません')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '編集' })).not.toBeInTheDocument()
  })

  it('「すべて見る」リンクを正しいhrefで表示する', async () => {
    vi.mocked(getRecentPosts).mockResolvedValue([])
    vi.mocked(getRecentDrafts).mockResolvedValue([])

    const jsx = await RecentPostList()
    render(jsx)

    const viewAllLinks = screen.getAllByRole('link', { name: 'すべて見る →' })
    expect(viewAllLinks[0]).toHaveAttribute('href', '/')
    expect(viewAllLinks[1]).toHaveAttribute('href', '/admin/posts/drafts')
  })
})
