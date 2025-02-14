import * as z from 'zod'
export const LoginFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export type LoginFormData = z.output<typeof LoginFormDataSchema>

export const LoginDataSchema = LoginFormDataSchema
export type LoginDataInput = z.input<typeof LoginDataSchema>
export type LoginData = z.output<typeof LoginDataSchema>

export const UserMetadataSchema = z.object({
  fullName: z.string().min(1),
  avatar: z.string().url(),
})
export type UserMetadata = z.output<typeof UserMetadataSchema>
