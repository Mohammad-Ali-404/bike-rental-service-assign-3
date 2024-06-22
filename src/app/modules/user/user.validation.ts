import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }),
    phone: z.string({ required_error: 'Phone Number is required' }),
    role: z.string({ required_error: 'Role is required' }),
    address: z.string({ required_error: 'Address is required' }),
  }),
})

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }).email().optional(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(2, { message: 'Password need more than 2 characters' })
      .max(20, 'Password need less than 20 characters')
      .optional(),
    phone: z.string({ required_error: 'Phone number is required' }).optional(),
    address: z.string({ required_error: 'Address is required' }).optional(),
    role: z.string({ required_error: 'Role is required' }).optional(),
  }),
})

// login user validation using zod
const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
})

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  loginUserValidationSchema,
}
