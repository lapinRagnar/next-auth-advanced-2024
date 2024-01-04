'use client'

import { FaUser } from 'react-icons/fa'
import { IoMdLogOut } from "react-icons/io"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LogoutButton } from '@/components/auth/LogoutButton'

export const UserButton = () => {
  
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-green-950'>
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40' align='end'>
        <LogoutButton>
          <DropdownMenuItem>
            <IoMdLogOut className='w-6 h-6 mr-2' /> 
            <span>Logout</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
