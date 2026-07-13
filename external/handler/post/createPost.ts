'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createPost, attachTagsToPost, CreatePostData } from '@/external/repositories/postRepository'

export async function createPostAction(
  data: CreatePostData,
  tagIds: string[] = []
): Promise<{ data: { id: string } | null; error: string | null }> {
  const supabase = await createServerSupabaseClient()
  const { data: post, error } = await createPost(supabase, data)

  if (error || !post) {
    return { data: null, error }
  }

  if (tagIds.length > 0) {
    const { error: tagError } = await attachTagsToPost(supabase, post.id, tagIds)

    if (tagError) {
      return { data: null, error: tagError }
    }
  }

  revalidatePath('/')
  revalidatePath('/admin')

  return { data: post, error: null }
}
