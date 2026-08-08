'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { inviteUser } from '@/external/repositories/authAdminRepository'
import { inviteUserSchema } from '@/external/schemas/userSchema'

export async function inviteUserAction(
  input: unknown
): Promise<{ error: string | null }> {
  const parsed = inviteUserSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? '入力内容が不正です' }
  }

  const { email, displayName } = parsed.data

  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') ?? 'https'
  const origin = host ? `${protocol}://${host}` : ''
  const redirectTo = `${origin}/auth/confirm?next=/invite`

  const { error } = await inviteUser(email, displayName || null, redirectTo)

  if (error) {
    return { error }
  }

  revalidatePath('/admin/users')

  return { error: null }
}
