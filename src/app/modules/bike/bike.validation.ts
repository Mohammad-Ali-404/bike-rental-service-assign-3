import { z } from 'zod'

const createBikeValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    description: z.string({ required_error: 'Description is Required' }),
    pricePerHour: z.number({ required_error: 'Price per hour is Required' }),
    isAvailable: z.boolean().optional(),
    cc: z.number({ required_error: 'CC is Required' }),
    year: z.number({ required_error: 'Year is Required' }),
    model: z.string({ required_error: 'Model is Required' }),
    brand: z.string({ required_error: 'Brand is Required' }),
  }),
})

const updateBikeValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }).optional(),
    description: z
      .string({ required_error: 'Description is Required' })
      .optional(),
    pricePerHour: z
      .number({ required_error: 'Price per hour is Required' })
      .optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number({ required_error: 'CC is Required' }).optional(),
    year: z.number({ required_error: 'Year is Required' }).optional(),
    model: z.string({ required_error: 'Model is Required' }).optional(),
    brand: z.string({ required_error: 'Brand is Required' }).optional(),
  }),
})

export const BikeValidations = {
  createBikeValidation,
  updateBikeValidation,
}
