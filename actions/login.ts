'use server'


import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'

import { signIn } from '@/auth'

import { getUserByEmail } from '@/data/user'

import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail'

import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'

import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken'

import { db } from '@/lib/db'

import { getTwoFactorConfirmationByUserId } from './../data/twoFactorConfirmation'


export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {

  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) return { error: '***Champ invalide***'}
  
  const { email, password, code } = validatedFields.data


  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "le mail n'existe pas!" }
  }

  /**
   * generer un mail de confirmation
   */
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Email de confirmation envoyé!" }
  }


  if ( existingUser.isTwoFactorEnabled && existingUser.email) {

    if (code) {

      // TODO: verifier le code de securité - c'est fait

      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) return { error: "Code de securité invalide - 2 factor token n'existe pas!" }

      if (twoFactorToken.token !== code) return { error: "Code de securité saisi est invalide!" }

      const hasExpires = new Date(twoFactorToken.expires) < new Date()

      if (hasExpires) return { error: "le code de securité est expirée!" }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })

    } else {

      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
  
      return { twoFactor: true }

    }

  }



  try {
    await signIn("credentials", {
      email,
      password, 
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
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

