'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'


import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/passwordResetToken'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
  
  if (!token) return { error: "Le token n'existe pas" }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) return { error: "champ invalide" }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) return { error: "Le token n'existe pas" }

  const hasExpires = new Date(existingToken.expires) < new Date()

  if (hasExpires) return { error: "Le token a expiré" }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: "L'email n'existe pas" }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword }
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  })

  return { success: "Mot de passe mis à jour!" }

}







