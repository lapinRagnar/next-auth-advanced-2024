import * as z from 'zod'

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.string().email({ message: '***Champ obligatoire***' }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(4, { message: '***minimum 4 characters***' }),
})

export const ResetSchema = z.object({
  email: z.string().email({ message: '***Champ obligatoire***' }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: '***Champ obligatoire***' }),
  password: z.string().min(1, { message: '***Champ obligatoire***' }),
  code: z.optional(z.string())
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: '***Champ obligatoire***' }),
  password: z.string().min(4, { message: '***minimum 4 characters***' }),
  name: z.string().min(1, { message: '***minimum 4 characters***' })
})


