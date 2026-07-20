import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  slug: z.string().min(1, 'スラッグを入力してください'),
  content: z.string().min(1, '本文を入力してください'),
  image_path: z.string().nullable(),
  category_id: z.string().nullable(),
  author_id: z.string().min(1, '著者を選択してください'),
  status: z.enum(['draft', 'published']),
  published_at: z.string().nullable(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const postTagIdsSchema = z.array(z.string())
