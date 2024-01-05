import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession }  from "next-auth"
// import GitHub from "next-auth/providers/github"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

import { getUserById } from "@/data/user"

import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation"
import { getAccountByUserId } from "./data/account"



/**
 * parmet d'ajouter le type role a la session - pour typescript
 */
declare module "@auth/core/types" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: UserRole
      // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
    } & DefaultSession["user"] // To keep the default types
  }
}



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // providers: [GitHub],

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    }
  },

  callbacks: {

    async signIn({ user, account }) {

      /**
       * Allow OAuth without verification email
       */

      if (account?.provider !== 'credentials') return true


      const existingUser = await getUserById(user.id)

      /**
       * Si l'email n'est pas veriffié, on ne peut pas se connecter
       * prevent sign in without email verification
       */
      if (!existingUser || !existingUser.emailVerified) return false


      // TODO : add 2FA check - c fait
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false
        
        /**
         * delete two factor confirmation for next sign in
         */
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
        


      }

      return true
    },

    async session({ token, session }) {


      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      /**
       * pour mettre à jour le nom, l'email et isOauth automatiquement quand on les modifie
       */
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOauth = token.isOauth as boolean
      }
      
      return session
    },
    async jwt({ token}) {


      token.customField = "custom value"
      

      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.name = existingUser.name
      token.email = existingUser.email
      token.isOauth = !!existingAccount               // le !! permet de caster en boolean
      
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})