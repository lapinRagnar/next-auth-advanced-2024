
import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <main 
      className="
        flex h-full flex-col items-center justify-center
        bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
        from-neutral-700 to-orange-800
      ">
        <div className='space-y-6 text-center'>
          <h1 className='text-6xl font-semibold text-white drop-shadow-md'>🔏 Auth</h1>
          <p className='text-gray-300 text-lg'>A simple authentication service</p>          
        </div>
    </main>
  )
}
