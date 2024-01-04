'use server'

import * as z from 'zod'

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.parse(values)

  if (!validatedFields.email) return { error: '*** email invalide***' }

  const { email } = validatedFields

  const existingUser = await getUserByEmail(email)

  if (!existingUser) return { error: "Cet email n'existe pas!" }

  // TODO: generate token and send email

  return { success: "Email envoyé!" }

}



