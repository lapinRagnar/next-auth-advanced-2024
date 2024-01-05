import { Poppins } from 'next/font/google'
import {Button} from '@/components/ui/button'
import { cn } from '@/lib/utils'
import LoginButton from '@/components/auth/LoginButton'


const font = Poppins({ weight: ['600'], subsets: ['latin'] })

export default function Home() {
  return (
    <main 
      className="
        flex h-full flex-col items-center justify-center
        bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
        from-neutral-700 to-orange-800
      ">
        <div className='space-y-6 text-center'>
          <h1 className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
            )}
          >
            🔏 Auth
          </h1>
          <p className='text-gray-300 text-lg'>A simple authentication service</p>

          <LoginButton mode='modal' asChild>
            <Button variant={'secondary'} size={'lg'}>Sign In</Button>          
          </LoginButton>
        </div>
    </main>
  )
}
