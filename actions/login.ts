'use server'


import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'

import { signIn } from '@/auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values)
  const validatedFields = LoginSchema.parse(values)

  if (!validatedFields.email) {
    return {
      error: '***Champ email invalide***'
    }
  }
  
  if (!validatedFields.password) {
    return {
      error: '***Champ password invalide***'
    }
  }

  const { email, password } = validatedFields

  try {
    await signIn("credentials", {
      email,
      password, 
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Identifiants invalides!" }

        default :
          return { error: "Une erreur est survenue!" }
      }
    }

    throw error
  }

}

