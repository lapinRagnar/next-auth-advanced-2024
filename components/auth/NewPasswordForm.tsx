'use client'

import * as z from 'zod'

import { useState, useTransition } from 'react'


import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSearchParams } from 'next/navigation'

import { NewPasswordSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { CardWrapper } from "@/components/auth/CardWrapper"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { newPassword } from '@/actions/new-password'

export const NewPasswordForm = () => {

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('') 
  const [success, setSuccess] = useState<string | undefined>('') 

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {

    setError('')
    setSuccess('')

    console.log(values)
    

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setError(data?.error)
          // TODO: add when we add 2FA
          setSuccess(data?.success)
        })
    })
    
  }


  return (
    <CardWrapper
      headerLabel="Entrez votre nouveau mot de passe"
      backButtonLabel="Retour a la page de connexion"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'  
        >
          <div className='space-y-4'>
            <FormField 
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='****************'
                      type='password'
                      disabled={isPending}
                    />  
                  </FormControl>    
                  <FormMessage />              
                </FormItem>

              )}
            />


          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type='submit' className="w-full">Reinitialiser le mot de passe</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}

