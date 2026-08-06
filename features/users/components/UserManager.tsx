'use client'

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

export default function UserManager({ initialUsers }: Props) {
  const users = initialUsers

  return (
    <div className="space-y-6">
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
            {users.map((user) => (
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
                </div>
              </li>
            ))}
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
