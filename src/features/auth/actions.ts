'use server'

import { type LoginFormData } from '@/features/auth/authSchemas'
import { parseLoginData } from '@/features/auth/helpers'
import paths from '@/shared/constants/paths'
import { createClient } from '@/services/supabase/supabaseServer'
import { type User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(loginFormData: LoginFormData) {
  console.log('login action', { loginFormData })
  const supabase = await createClient()

  const { success, data, error: parsingError } = parseLoginData(loginFormData)

  if (!success) {
    console.error(parsingError)
    return
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath(paths.dashboard.pathname, 'layout')
  redirect(paths.dashboard.pathname)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const {
    success,
    data,
    error: parsingError,
  } = parseLoginData({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (!success) {
    console.error(parsingError)
    redirect('/error')
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath(paths.dashboard.pathname, 'layout')
  redirect(paths.dashboard.pathname)
}

export const logout = async () => {
  console.log('logout')

  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message, error)
  }
}

export const getUser = async (): Promise<User> => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message, error)
  }

  if (!data?.user) {
    throw new Error('Unknown auth error')
  }
  return data.user
}

export const validateSession = async (): Promise<void> => {
  try {
    await getUser()
  } catch (error) {
    console.error(error)
    redirect(paths.login.pathname)
  }
}
