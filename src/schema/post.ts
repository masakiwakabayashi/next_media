import { z } from "zod";

export const postContentSchema = z.object({
  content: z.string().min(1).max(140),
});
export type PostContentSchema = z.infer<typeof postContentSchema>;
