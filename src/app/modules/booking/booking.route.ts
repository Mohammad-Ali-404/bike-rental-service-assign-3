import { Router } from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { BookingController } from './booking.controller'
import { bookingValidations } from './booking.validation'

const router = Router()

// all booking routes
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(bookingValidations.createBookingValidationSchema),
  BookingController.createBooking,
)

router.put(
  '/:id/return',
  auth('admin'),
  validateRequest(bookingValidations.returnValidationSchema),
  BookingController.reutnBookingBike,
)

router.get('/', auth('admin', 'user'), BookingController.getMyAllBookings)

export const BookingRoutes = router
