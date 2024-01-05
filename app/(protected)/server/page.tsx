import { auth } from '@/auth'
import { UserInfo } from '@/components/UserInfo'
import { currentUser } from '@/lib/auth'

const ServerPage = async () => {

  const session = await auth()
  const user = await currentUser()

  return (
    <div className='flex w-full items-center justify-center'>

      <UserInfo  
        user={user}
        label="Server Component - 🌍 - User Info"
      />

    </div>
  )
}

export default ServerPage