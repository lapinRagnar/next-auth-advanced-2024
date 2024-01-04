import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession }  from "next-auth"
// import GitHub from "next-auth/providers/github"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

import { getUserById } from "@/data/user"



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


      // TODO : add 2FA check

      return true
    },

    async session({ token, session }) {

      console.log({sessionToken : token, session});

      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      
      return session
    },
    async jwt({ token}) {
      console.log({token})
      token.customField = "custom value"

      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})