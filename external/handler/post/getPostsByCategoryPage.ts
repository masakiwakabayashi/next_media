'use server'

import {
  getPostsByCategoryPage,
  type PostsPage,
} from '@/external/repositories/postRepository.server'
import { categoryPostsPageInputSchema } from '@/external/schemas/postSchema'

// 無限スクロール用にカテゴリー別記事一覧の1ページ分を取得する Server Action。
// 読み取りロジックは repository の getPostsByCategoryPage に集約している。
export async function getPostsByCategoryPageAction(
  input: unknown
): Promise<PostsPage> {
  const parsed = categoryPostsPageInputSchema.safeParse(input)

  if (!parsed.success) {
    return { posts: [], nextCursor: null }
  }

  return getPostsByCategoryPage({
    categorySlug: parsed.data.categorySlug,
    cursor: parsed.data.cursor,
  })
}
