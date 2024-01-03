import { auth } from '@/auth'


const SettingsPage = async () => {
  const session = await auth()
  return (
    <div>
      <div>Settings Page</div>
      {JSON.stringify(session)}
    </div>
    
  )
}

export default SettingsPage