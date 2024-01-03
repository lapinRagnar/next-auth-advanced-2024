import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
// import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"


export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.parse(credentials)

        const { email, password } = validatedFields

        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (passwordMatch) return user

        return null
      }
    })
  ],
} satisfies NextAuthConfig