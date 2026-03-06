import { Metadata } from 'next'
import LoginForm from '@/features/auth/components/LoginForm'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  )
}
