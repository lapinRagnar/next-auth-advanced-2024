import crypto from 'crypto'

import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'

import { getVerificationTokenByEmail } from '@/data/verificationToken'
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken'

import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken'



export const generateTwoFactorToken = async (email: string) => {

  const token = crypto.randomInt(100_000, 1_000_000).toString()
  
  //TODO: plus tard on va changer la duree d'expiration en 15mn
  const expires = new Date(new Date().getTime() + 3600 * 1000)  // on ajoute une heure à partir de maintenant - expiré dans 1h

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return twoFactorToken

}



export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)  // on ajoute une heure à partir de maintenant

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken

}



export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)  // on ajoute une heure à partir de maintenant

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken

}