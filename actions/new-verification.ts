'use server'

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verificationToken"

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) return { error: "Le token n'existe pas" }

  const hasExpires = new Date(existingToken.expires) < new Date()

  if (hasExpires) return { error: "Le token a expiré" }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: "L'email n'existe pas" }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email }
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success: "Email confirmé!" }

}








