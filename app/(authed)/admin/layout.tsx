import { ReactNode } from 'react'
import RequireAdmin from '@/features/auth/components/RequireAdmin'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <RequireAdmin>{children}</RequireAdmin>
}
