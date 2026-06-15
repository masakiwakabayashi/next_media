import { Metadata } from 'next'
import Link from 'next/link'
import DashboardStats from '@/features/admin/components/DashboardStats'
import RecentPostList from '@/features/admin/components/RecentPostList'

export const metadata: Metadata = {
  title: '管理者ダッシュボード',
}

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          ダッシュボード
        </h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          記事を作成
        </Link>
      </div>

      <DashboardStats />

      <RecentPostList />
    </div>
  )
}
