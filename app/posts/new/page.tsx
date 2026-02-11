import { Metadata } from 'next'
import PostCreate from '@/features/posts/components/PostCreate'
import { supabase } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: '記事を作成',
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

async function getAuthors() {
  const { data, error } = await supabase
    .from('authors')
    .select('id, display_name')
    .order('display_name')

  if (error) {
    console.error('Error fetching authors:', error)
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

export default async function NewPostPage() {
  const [categories, authors, tags] = await Promise.all([
    getCategories(),
    getAuthors(),
    getTags(),
  ])

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        記事を作成
      </h1>
      <PostCreate categories={categories} authors={authors} tags={tags} />
    </div>
  )
}
