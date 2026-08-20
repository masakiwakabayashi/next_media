import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

vi.mock('@/features/posts/components/PostList', () => ({
  default: ({ query, page }: { query?: string; page?: number }) => (
    <div data-testid="post-list">{JSON.stringify({ query, page })}</div>
  ),
}))
vi.mock('@/features/posts/components/SearchForm', () => ({
  default: ({ defaultValue }: { defaultValue?: string }) => (
    <div data-testid="search-form">{defaultValue}</div>
  ),
}))

describe('Home', () => {
  it('検索クエリとページ番号をSearchFormとPostListに渡す', async () => {
    const jsx = await Home({
      searchParams: Promise.resolve({ q: 'キーワード', page: '3' }),
    })
    render(jsx)

    expect(screen.getByTestId('search-form')).toHaveTextContent('キーワード')
    expect(JSON.parse(screen.getByTestId('post-list').textContent ?? '{}')).toEqual({
      query: 'キーワード',
      page: 3,
    })
  })
})
