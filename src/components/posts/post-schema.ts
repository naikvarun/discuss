import {z} from 'zod'
export const postSchema = z.object({
  title: z.string().trim().min(3),
  content: z.string().trim().min(10)
})

export type CreatePostSchema = z.output<typeof postSchema>
