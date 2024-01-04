'use client'

import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/useCurrentUser"



const SettingsPage =  () => {

  const user = useCurrentUser()

  const onClick = () => {
    logout()
  }

  

  return (
    <div className="bg-white p-10 rounded-xl">
      
      <div>Settings Page</div>
      


      { JSON.stringify(user) }


    
      <button 
        className="bg-red-700 text-white p-3 rounded-md"
        onClick={onClick}  
      >
        se deconnecter
      </button>

    </div>
    
  )
}

export default SettingsPage