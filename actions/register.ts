'use server'

import * as z from 'zod'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values)
  const validatedFields = RegisterSchema.parse(values)

  if (!validatedFields.name) {
    return {
      error: '***Champ name invalide - 4 caractères minimum !***'
    }
  }

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

  return {
    success: "Email envoyé!"
  }
}

