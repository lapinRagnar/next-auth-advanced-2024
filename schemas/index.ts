import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(4, { message: '***minimum 4 characters***' })),
  newPassword: z.optional(z.string().min(4, { message: '***minimum 4 characters***' })),
  isOauth: z.optional(z.boolean()),
}) .refine((data) => {

  if (data.password && !data.newPassword) return false
  return true
}, {
  message: '*** le nouveau mot de passe est un champ obligatoire!***',
  path: ['newPassword'],
}) .refine((data) => {

  if (data.newPassword && !data.password) return false
  return true
}, {
  message: '*** le nouveau mot de passe est un champ obligatoire!***',
  path: ['password'],
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


