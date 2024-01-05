'use client'

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { Button } from '@/components/ui/button'

import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import { useSearchParams } from 'next/navigation'

export const Social = () => {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')


  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }


  return (
    <div className="flex flex-col w-full gap-y-2">
      <Button
        size={'lg'}
        className='w-full'
        variant={'outline'}
        onClick={() => onClick('google')}
      >
        <FcGoogle className="w-5 h-5 mr-4" />
        Sign in with Google
      </Button>

      <Button
        size={'lg'}
        className='w-full'
        variant={'outline'}
        onClick={() => onClick('github')}
      >
        <FaGithub className="w-5 h-5 mr-4" />
        Sign in with Github
      </Button>
    </div>
  )
}