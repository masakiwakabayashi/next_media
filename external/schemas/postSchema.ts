import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  slug: z.string().min(1, 'スラッグを入力してください'),
  content: z.string().min(1, '本文を入力してください'),
  image_path: z.string().nullable(),
  category_id: z.string().nullable(),
  author_id: z.string().min(1, '著者を選択してください'),
  status: z.enum(['draft', 'published', 'archived']),
  published_at: z.string().nullable(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const postTagIdsSchema = z.array(z.string())

// 無限スクロールの1ページ取得（Server Action）の入力
export const postsPageInputSchema = z.object({
  query: z.string().optional(),
  cursor: z
    .object({
      publishedAt: z.string(),
      id: z.string(),
    })
    .nullish(),
})

export type PostsPageInput = z.infer<typeof postsPageInputSchema>
