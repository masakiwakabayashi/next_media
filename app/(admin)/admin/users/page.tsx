import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import UserManager, { UserProfile } from '@/features/users/components/UserManager'

// 実装する機能
// ・ユーザーの一覧表示
// ・ユーザーの無効化
// ・ユーザーの招待


export const metadata: Metadata = {
  title: 'ユーザー管理',
}

// TODO: repository 実装後に差し替える
async function getUsers(): Promise<UserProfile[]> {
  return []
}

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          ユーザー管理
        </h1>
        <Link
          href="/admin"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          ← ダッシュボードへ
        </Link>
      </div>

      <Suspense>
        <UserManager initialUsers={users} />
      </Suspense>
    </div>
  )
}
