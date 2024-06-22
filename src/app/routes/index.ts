import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { BikeRoutes } from '../modules/bike/bike.routes'
import { BookingRoutes } from '../modules/booking/booking.route'

const router = Router()
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
]
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
