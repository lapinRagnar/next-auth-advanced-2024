'use client'

import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useSession, signOut } from "next-auth/react"

// import { auth, signOut } from '@/auth'




const SettingsPage =  () => {
  // const session = await auth()

  const user = useCurrentUser()

  const onClick = () => {
    // signOut()
    logout()
  }

  

  return (
    <div>
      
      <div>Settings Page</div>
      
      {/* {JSON.stringify(session)} */}

      { JSON.stringify(user) }

{/*       <form action={async () => {
        "use server"
        await signOut()
      }}>
        <button className='bg-red-700 text-white p-3 rounded-md' type='submit'>Logout</button>
      </form> */}
    
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