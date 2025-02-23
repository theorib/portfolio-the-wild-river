'use server'

import { type LoginFormData } from '@/features/auth/authSchemas'
import { parseLoginData } from '@/features/auth/helpers'
import paths from '@/shared/constants/paths'
import { createClient } from '@/services/supabase/supabaseServer'
import { type User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import logger from '@/features/logger'

export async function login(loginFormData: LoginFormData) {
  const supabase = await createClient()

  const { success, data, error: parsingError } = parseLoginData(loginFormData)

  if (!success) {
    logger
      .withMetadata({
        function: 'login',
        loginFormData,
      })
      .withError(parsingError)
      .error(
        'loginFormData for user %s failed to be parsed with parsingError: %s',
        loginFormData.email,
        parsingError.message,
      )
    return
  }

  const { error, data: supabaseData } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    logger
      .withMetadata({
        function: 'login',
        loginFormData,
        supabaseData,
      })
      .withError(error)
      .error(
        'User %s failed to login to Supabase with error: %s',
        loginFormData.email,
        error.message,
      )
    return
  }

  logger
    .withMetadata({
      function: 'login',
      loginFormData,
      supabaseData,
    })
    .info(
      'User %s successfully logged in to Supabase Auth',
      loginFormData.email,
    )

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
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    logger
      .withMetadata({
        function: 'logout',
      })
      .withError(error)
      .error('Error logging out user')
  }
}

export const getUser = async (): Promise<User> => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    logger
      .withMetadata({
        function: 'getUser',
        supabaseData: data,
      })
      .withError(error)
      .error('Error getting user')
    redirect(paths.login.pathname)
  }

  return data.user
}

export const validateSession = async (): Promise<void> => {
  try {
    await getUser()
  } catch (error) {
    logger
      .withMetadata({
        function: 'validateSession',
      })
      .withError(error)

    redirect(paths.login.pathname)
  }
}
