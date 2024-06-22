import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'
import noDataFound from '../../middlewares/noDataFound'

// create booking controller
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  })
})

const updateBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.updateBookingIntoDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  })
})

const getMyAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyAllBookingsIntoDB(req.user)

  const isNoDataFound = noDataFound(res, result)

  if (!isNoDataFound) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Rentals retrieved successfully',
      data: result,
    })
  }
})

export const BookingController = {
  createBooking,
  updateBooking,
  getMyAllBookings,
}
