'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export type UserProfile = {
  id: string
  user_id: string | null
  display_name: string
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  email?: string
}

type Props = {
  initialUsers: UserProfile[]
}

type EditState = {
  id: string
  display_name: string
  bio: string
  avatar_url: string
}

export default function UserManager({ initialUsers }: Props) {
  const router = useRouter()
  const [users, setUsers] = useState(initialUsers)
  const [editState, setEditState] = useState<EditState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function startEdit(user: UserProfile) {
    setEditState({
      id: user.id,
      display_name: user.display_name,
      bio: user.bio ?? '',
      avatar_url: user.avatar_url ?? '',
    })
    setError(null)
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault()
    if (!editState) return
    setError(null)
    setIsSubmitting(true)

    // TODO: updateUserProfile(editState.id, { ... }) を呼ぶ
    await new Promise((r) => setTimeout(r, 0))

    setUsers((prev) =>
      prev.map((u) =>
        u.id === editState.id
          ? {
              ...u,
              display_name: editState.display_name,
              bio: editState.bio || null,
              avatar_url: editState.avatar_url || null,
            }
          : u
      )
    )
    setEditState(null)
    setIsSubmitting(false)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            ユーザー一覧（{users.length}件）
          </h2>
        </div>

        {users.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-zinc-400">
            ユーザーがいません
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {users.map((user) =>
              editState?.id === user.id ? (
                <li key={user.id} className="px-6 py-5">
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                          表示名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={editState.display_name}
                          onChange={(e) =>
                            setEditState({ ...editState, display_name: e.target.value })
                          }
                          required
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                          アバターURL
                        </label>
                        <input
                          type="url"
                          value={editState.avatar_url}
                          onChange={(e) =>
                            setEditState({ ...editState, avatar_url: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        自己紹介
                      </label>
                      <textarea
                        value={editState.bio}
                        onChange={(e) =>
                          setEditState({ ...editState, bio: e.target.value })
                        }
                        rows={3}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      >
                        {isSubmitting ? '保存中...' : '保存'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditState(null)}
                        className="rounded border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      >
                        キャンセル
                      </button>
                    </div>
                  </form>
                </li>
              ) : (
                <li key={user.id} className="flex items-center gap-4 px-6 py-4">
                  <Avatar user={user} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {user.display_name}
                      </span>
                      {user.email && (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          {user.email}
                        </span>
                      )}
                    </div>
                    {user.bio && (
                      <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {user.bio}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-xs text-zinc-400 dark:text-zinc-500 sm:block">
                      {formatDate(user.created_at)}
                    </span>
                    <button
                      onClick={() => startEdit(user)}
                      className="rounded border border-zinc-300 px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      編集
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

function Avatar({ user }: { user: UserProfile }) {
  if (user.avatar_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatar_url}
        alt={user.display_name}
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    )
  }

  const initials = user.display_name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
      {initials}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
