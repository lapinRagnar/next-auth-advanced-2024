'use client'

import { useCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import { FormError } from "@/components/FormError"

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {

  const role = useCurrentRole()

  if (role !== allowedRole) {

    return (
      <FormError message={`Vous devez être ${allowedRole} pour voir cette page`} />
    )
  }

  return (
    <>
      {children}
    </>
  )
}

