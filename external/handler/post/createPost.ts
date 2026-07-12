'use server'

import { revalidatePath } from 'next/cache'
import { createPost, attachTagsToPost, CreatePostData } from '@/external/repositories/postRepository'

export async function createPostAction(
  data: CreatePostData,
  tagIds: string[] = []
): Promise<{ data: { id: string } | null; error: string | null }> {
  const { data: post, error } = await createPost(data)

  if (error || !post) {
    return { data: null, error }
  }

  if (tagIds.length > 0) {
    const { error: tagError } = await attachTagsToPost(post.id, tagIds)

    if (tagError) {
      return { data: null, error: tagError }
    }
  }

  revalidatePath('/')
  revalidatePath('/admin')

  return { data: post, error: null }
}
