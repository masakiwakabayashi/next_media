import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CategoryPage from './page'

vi.mock('@/features/posts/components/CategoryPostList', () => ({
  default: ({ categorySlug }: { categorySlug: string }) => (
    <div data-testid="category-post-list">{categorySlug}</div>
  ),
}))

describe('CategoryPage', () => {
  it('paramsのslugをCategoryPostListにcategorySlugとして渡す', async () => {
    const jsx = await CategoryPage({ params: Promise.resolve({ slug: 'news' }) })
    render(jsx)

    expect(screen.getByTestId('category-post-list')).toHaveTextContent('news')
  })
})
