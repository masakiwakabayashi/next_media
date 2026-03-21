import { notFound } from 'next/navigation'
import PostEdit from '@/features/posts/components/PostEdit'
import { getDraftPostForEdit } from '@/features/posts/repositories/postRepository'
import { supabase } from '@/lib/supabase/client'

type Props = {
  params: Promise<{ slug: string }>
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

async function getTags() {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .order('name')

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  return data || []
}

export default async function DraftEditPage({ params }: Props) {
  const { slug } = await params

  const [post, categories, tags] = await Promise.all([
    getDraftPostForEdit(slug),
    getCategories(),
    getTags(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        下書きを編集
      </h1>
      <PostEdit post={post} categories={categories} tags={tags} />
    </div>
  )
}
