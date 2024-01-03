import bcrypt from "bcryptjs"

import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"


export default {
  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),

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