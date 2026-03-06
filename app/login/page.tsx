import { Metadata } from 'next'
import LoginForm from '@/features/auth/components/LoginForm'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        ログイン
      </h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        登録済みのメールアドレスとパスワードを入力してログインしてください。
      </p>
      <LoginForm />
    </div>
  )
}
