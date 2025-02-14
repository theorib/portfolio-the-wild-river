import {
  type LoginData,
  type LoginFormData,
  LoginFormDataSchema,
} from '@/features/auth/authSchemas'
import { fromError, type ValidationError } from 'zod-validation-error'

export type ParseLoginFormDataOutput =
  | {
      success: true
      data: LoginData
      error: undefined
    }
  | {
      success: false
      data: undefined
      error: ValidationError
    }

export const parseLoginData = (
  loginData: LoginFormData,
): ParseLoginFormDataOutput => {
  console.log('parseLoginData', { loginData })

  const {
    success,
    data,
    error: parsingError,
  } = LoginFormDataSchema.safeParse(loginData)

  if (!success) {
    return { success: false, error: fromError(parsingError), data: undefined }
  }
  return { success: true, data, error: undefined }
}
