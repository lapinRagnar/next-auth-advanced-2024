import { auth } from '@/auth'
import { UserInfo } from '@/components/UserInfo'
import { currentUser } from '@/lib/auth'

const ServerPage = async () => {

  const session = await auth()
  const user = await currentUser()

  return (
    <div>

      <UserInfo  
        user={user}
        label="Server Component - 🌍 - User Info"
      />

      <h1 className='text-5xl text-gray-200 mb-5 mt-11'>Exemple de fetch de session sur un server component</h1>
      <div className='text-gray-100'>
        {JSON.stringify(session?.user)}
      </div>

      <div className='text-green-500'>
        {JSON.stringify(user)}
      </div>

    </div>
  )
}

export default ServerPage