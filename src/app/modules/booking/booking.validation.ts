import { z } from 'zod'

const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({ required_error: 'Bike Id is required' }),
    startTime: z.string({ required_error: 'Start time is required' }),
  }),
})

const returnValidationSchema = z.object({
  body: z.object({
    returnTime: z.string().optional(),
    totalCost: z.number().optional(),
    isReturned: z.boolean().optional(),
  }),
})

export const bookingValidations = {
  createBookingValidationSchema,
  returnValidationSchema,
}
