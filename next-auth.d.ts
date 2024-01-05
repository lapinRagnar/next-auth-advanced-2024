import NextAuth, { type DefaultSession }  from "next-auth"
import { UserRole } from "@prisma/client"


export type ExtendedUser = DefaultSession["user"] & {
  id: string
  role: UserRole
  isTwoFactorEnabled: boolean
  isOauth: boolean
}

declare module "next-auth" {

  interface Session {
    user: ExtendedUser
  }
}


import { JWT } from "@auth/core/jwt"
import { UserRole } from "@prisma/client"


declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole
  }
}
