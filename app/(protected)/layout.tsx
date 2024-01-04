
import { Navbar } from './_components/Navbar'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
  return (
    <div 
      className="
        h-full w-full
        bg-gradient-to-r from-gray-950 from-15% via-orange-500 via-30% to-emerald-900 to-70%
      "
    >
      
      <Navbar />
      
      <div className='h-full flex flex-col gap-y-10 items-center justify-center'>
        {children}
      </div>
    
    </div>
  )
}

export default ProtectedLayout