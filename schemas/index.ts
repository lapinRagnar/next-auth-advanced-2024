import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: '***Champ obligatoire***' }),
  password: z.string().min(1, { message: '***Champ obligatoire***' })
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: '***Champ obligatoire***' }),
  password: z.string().min(4, { message: '***minimum 4 characters***' }),
  name: z.string().min(1, { message: '***minimum 4 characters***' })
})


