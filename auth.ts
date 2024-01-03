import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession }  from "next-auth"
// import GitHub from "next-auth/providers/github"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

import { getUserById } from "@/data/user"


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
  callbacks: {

    // async signIn({ user }) {

    //   const existingUser = await getUserById(user.id)

    //   /**
    //    * Si l'email n'est pas veriffié, on ne peut pas se connecter
    //    */
    //   if (!existingUser || !existingUser.emailVerified) return false

    //   return true
    // },

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