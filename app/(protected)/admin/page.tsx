'use client'

import { useCurrentRole } from "@/hooks/useCurrentRole"

const AdminPage = () => {
  
  const role = useCurrentRole()

  return (
    <div>
      <h1>Admin Page</h1>
      <div>Current Role : {role}</div>
    </div>
  )
}

export default AdminPage

