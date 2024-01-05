'use server'

import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export const admin = async () => {
  const role = await currentRole()

  if (role === UserRole.ADMIN) {
    return { success: "Server Action autorisé! Vous avez la permission d'acceder, vous êtes admin!" }
  }
  
  return { error: "Server Action non autorisé! Vous n'avez pas la permission d'acceder, vous n'etes pas admin!" }
}


