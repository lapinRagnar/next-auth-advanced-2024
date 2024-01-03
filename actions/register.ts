'use server'

import * as z from 'zod'
import bcrypt from 'bcrypt'

import { RegisterSchema } from '@/schemas'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

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

  const { name, email,password } = validatedFields
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Cet email existe déjà!"}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  // TO DO: Send verification token email


  return {
    success: "L'utilisateur a été crée avec succès!"
  }
}

