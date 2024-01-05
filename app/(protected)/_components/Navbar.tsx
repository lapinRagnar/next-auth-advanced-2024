'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/UserButton"


export const Navbar = () => {

  const pathname = usePathname()


  return (
    <nav 
      className="bg-black text-white p-3 w-full
        flex justify-between items-center shadow-sm
      "
    >
      

      <div className="flex gap-x-2">


        <Button 
          asChild
          variant={pathname === '/server' ? 'default' : 'outline'}
        >
          <Link href={'/server'} className="text-gray-600" >Server</Link>
        </Button>

        <Button 
          asChild
          variant={pathname === '/client' ? 'default' : 'outline'}
        >
          <Link href={'/client'} className="text-gray-600" >Client</Link>
        </Button>

        <Button 
          asChild
          variant={pathname === '/admin' ? 'default' : 'outline'}
        >
          <Link href={'/admin'} className="text-gray-600" >Admin</Link>
        </Button>


        <Button 
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href={'/settings'} className="text-gray-600">Settings</Link>
        </Button>

      </div>

      <UserButton />

    </nav>
  )
}