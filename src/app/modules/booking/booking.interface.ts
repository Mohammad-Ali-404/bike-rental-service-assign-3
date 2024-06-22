import { Types } from 'mongoose'

// booking types
export type TBooking = {
  userId?: Types.ObjectId
  bikeId: Types.ObjectId
  startTime: Date
  returnTime?: Date
  totalCost?: number
  isReturned: boolean
}
