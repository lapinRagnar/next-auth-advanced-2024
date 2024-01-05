'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SettingsSchema } from '@/schemas'

import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Switch } from '@/components/ui/switch'

import { useTransition, useState } from "react"

import { useSession } from "next-auth/react"
import { useCurrentUser } from '@/hooks/useCurrentUser'

import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'
import { UserRole } from '@prisma/client'



const SettingsPage =  () => {

  const user = useCurrentUser()

  const { update } = useSession()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,      
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

    startTransition(() => {

      settings(values) 
        .then((data) => {
          
          if (data.error){
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }

      }) 
        .catch((error) => setError("Une erreur est survenue, dans le fetch settings."))

    })

  }
  

  return (
    <Card className="w-[600px]">

      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔧Settings
        </p>
      </CardHeader>

      <CardContent>

        <Form {...form}>

          <form 
            className='space-y-6'
            onSubmit={form.handleSubmit(onSubmit)}  
          >

            <div className='space-y-4'>

              <FormField 
                control={form.control}
                name="name"
                render={({ field}) => (

                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder='ton nom'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                )}  
              />


              {user?.isOauth === false && (

                <>
                
                  <FormField 
                    control={form.control}
                    name="email"
                    render={({ field}) => (
    
                      <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder='ton.email@email.com'
                            disabled={true}
                            type='email'
                            
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      
                    )}  
                  />

                  <FormField 
                    control={form.control}
                    name="password"
                    render={({ field}) => (
    
                      <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder='******'
                            disabled={isPending}
                            type='password'
                            
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      
                    )}  
                  />
                
                </>

              )}



              


              <FormField 
                control={form.control}
                name="newPassword"
                render={({ field}) => (

                  <FormItem>
                    <FormLabel>new password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder='******'
                        disabled={isPending}
                        type='password'
                        
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                )}  
              />




              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectionner un role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>
                          Admin
                        </SelectItem>
                        <SelectItem value={UserRole.USER}>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              {user?.isOauth === false && (


                <FormField 
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field}) => (
  
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg'>
                      <div className='space-y-0.5'>
                        <FormLabel>2FA</FormLabel>
                        <FormDescription>
                          Acriver l&apos;authentification a deux facteur pour proteger votre compte
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                    
                  )}  
                />

              )}
              






            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type='submit'
              disabled={isPending}
            >
              Enregistrer
            </Button>
            

          </form>

        </Form>

      </CardContent>

    </Card>
    
  )
}

export default SettingsPage