// 'use client'

import { currentRole } from "@/lib/auth"

// import { useCurrentRole } from "@/hooks/useCurrentRole"

const AdminPage = async () => {
  
  const role = await currentRole()

  return (
    <div>
      <h1>Admin Page</h1>
      <div>Current Role : {role}</div>
    </div>
  )
}

export default AdminPage

