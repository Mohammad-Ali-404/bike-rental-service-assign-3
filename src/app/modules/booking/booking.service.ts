import { JwtPayload } from 'jsonwebtoken'
import { TBooking } from './booking.interface'
import { Booking } from './booking.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { Bike } from '../bike/bike.model'

// booking create service
const createBookingIntoDB = async (
  payload: TBooking,
  loggedUser: JwtPayload,
) => {
  const bookingData = {
    ...payload,
    userId: loggedUser?.id,
  }

  await Bike.findByIdAndUpdate(payload.bikeId, {
    isAvailable: false,
  })

  const result = await Booking.create(bookingData)

  return result
}

// return booking
const returnBookingIntoDB = async (id: string) => {
  const findBookedBike = await Booking.findById(id)
  console.log(findBookedBike)
  if (!findBookedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rentals not found')
  }

  const findBike = await Bike.findById(findBookedBike.bikeId)

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found')
  }

  const currentTime = new Date()
  const bookedTime = findBookedBike.startTime
  const differenceHours =
    (currentTime.getTime() - bookedTime.getTime()) / (1000 * 60 * 60)

  // Calculate the total cost
  const totalCost = differenceHours * findBike.pricePerHour

  // Update the bike's availability status
  await Bike.findByIdAndUpdate(findBookedBike.bikeId, {
    isAvailable: true,
  })

  // Update the booking with return time, total cost, and return status
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      returnTime: currentTime,
      totalCost: totalCost.toFixed(2), // Use 2 decimal places for the cost
      isReturned: true,
    },
    { new: true },
  )
  return result
}

// get all booking
const getMyAllBookingsIntoDB = async (loggedUser: JwtPayload) => {
  const result = await Booking.find({ userId: loggedUser?.id })

  return result
}

export const BookingServices = {
  createBookingIntoDB,
  returnBookingIntoDB,
  getMyAllBookingsIntoDB,
}
