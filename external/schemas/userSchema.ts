import { z } from 'zod'

export const setUserBannedSchema = z.object({
  userId: z.string().min(1, 'ユーザーIDが不正です'),
  banned: z.boolean(),
})

export type SetUserBannedInput = z.infer<typeof setUserBannedSchema>
