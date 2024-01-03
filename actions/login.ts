'use server'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'

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

  return {
    success: "Email envoyé!"
  }
}

