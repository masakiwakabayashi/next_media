import { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: '管理者ダッシュボード',
}

async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, status, created_at, authors(display_name), categories(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export default async function AdminPage() {
  const posts = await getAllPosts()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          記事一覧
        </h1>
        <Link
          href="/admin/create-post"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          新規作成
        </Link>
      </div>
    </div>
  )
}
