'use server'

import { signOut } from "@/auth"


export const logout = async () => {

  // TODO: faire ici des choses avant de se deconnecter
  
  await signOut()
}


