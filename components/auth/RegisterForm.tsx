'use client'

import * as z from 'zod'

import { useState, useTransition } from 'react'

import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
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

export const RegisterForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('') 
  const [success, setSuccess] = useState<string | undefined>('') 

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError('')
    setSuccess('')

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
    
  }


  return (
    <CardWrapper
      headerLabel="Create an account."
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'  
        >
          <div className='space-y-4'>

          <FormField 
              control={form.control}
              name='name'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='Your name'
                      type='text'
                      disabled={isPending}
                    />  
                  </FormControl>    
                  <FormMessage />              
                </FormItem>

              )}
            />

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

            <FormField 
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='********'
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

          <Button type='submit' className="w-full">Create an account</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}

