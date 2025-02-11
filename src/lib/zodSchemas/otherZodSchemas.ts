import { z } from 'zod'

export const EmailSchema = z.string().email().toLowerCase()
export type Email = z.infer<typeof EmailSchema>
