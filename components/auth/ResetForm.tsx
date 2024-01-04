'use client'

import * as z from 'zod'

import Link from 'next/link'
import { useState, useTransition } from 'react'


import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
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
import { login } from '@/actions/login'

export const ResetForm = () => {


  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('') 
  const [success, setSuccess] = useState<string | undefined>('') 

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError('')
    setSuccess('')

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error)
          // TODO: add when we add 2FA
          setSuccess(data?.success)
        })
    })
    
  }


  return (
    <CardWrapper
      headerLabel="Forgot you password?"
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
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='john.doe@example.com'
                      type='email'
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

          <Button type='submit' className="w-full">Send Reset Email</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}

