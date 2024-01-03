import { auth, signOut } from '@/auth'


const SettingsPage = async () => {
  const session = await auth()
  return (
    <div>
      
      <div>Settings Page</div>
      
      {JSON.stringify(session)}

      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <button className='bg-red-700 text-white p-3 rounded-md' type='submit'>Logout</button>
      </form>
    
    </div>
    
  )
}

export default SettingsPage