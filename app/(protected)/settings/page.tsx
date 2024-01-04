'use client'

import { useSession, signOut } from "next-auth/react"

// import { auth, signOut } from '@/auth'




const SettingsPage =  () => {
  // const session = await auth()

  const session = useSession()

  const onClick = () => {
    signOut()
  }

  

  return (
    <div>
      
      <div>Settings Page</div>
      
      {JSON.stringify(session)}

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