'use client'

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export const Social = () => {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <Button
        size={'lg'}
        className='w-full'
        variant={'outline'}
        onClick={() => {}}
      >
        <FcGoogle className="w-5 h-5 mr-4" />
        Sign in with Google
      </Button>

      <Button
        size={'lg'}
        className='w-full'
        variant={'outline'}
        onClick={() => {}}
      >
        <FaGithub className="w-5 h-5 mr-4" />
        Sign in with Github
      </Button>
    </div>
  )
}