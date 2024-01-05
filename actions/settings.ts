'use server'

import * as z from 'zod'

import bcrypt from 'bcryptjs'


import { db } from '@/lib/db'
import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {

  console.log('values avant', values)
  
  
  const user = await currentUser()

  if (!user) return { error: "***Vous n'êtes pas autorisée!" }

  const dbUser = await getUserById(user.id)

  if (!dbUser) return { error: "***Vous n'êtes pas autorisée, vous n'êtes dans la bdd!" }

  /**
   * on ne modifie pas ces champs quand on est oauth (cad - connexion sur google ou github)
   */
  if (user.isOauth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  /**
   * modifier l'email de l'utilisateur
   */
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)
    if (existingUser && existingUser.id !== user.id) return { error: "Cet email existe déjà!" }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Email de confirmation envoyé!" }
  }


  /**
   * modifier le mot de passe
   */

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)
    if (!passwordsMatch) return { error: "Mot de passe invalide, veuillez resaisir le même mot de passe!" }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }


  await db.user.update({
    where: { id: dbUser.id },
    data: {...values}
  })

  return { success: "Settings mis à jour!" }

}



