import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TagPage from './page'

vi.mock('@/features/posts/components/TagPostList', () => ({
  default: ({ tagSlug }: { tagSlug: string }) => <div data-testid="tag-post-list">{tagSlug}</div>,
}))

describe('TagPage', () => {
  it('paramsのslugをTagPostListにtagSlugとして渡す', async () => {
    const jsx = await TagPage({ params: Promise.resolve({ slug: 'gourmet' }) })
    render(jsx)

    expect(screen.getByTestId('tag-post-list')).toHaveTextContent('gourmet')
  })
})
