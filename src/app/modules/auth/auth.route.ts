import express from 'express'
import { AuthControllers } from './auth.controller'
import { UserValidation } from '../user/user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.signUp,
)
router.post(
  '/login',
  validateRequest(UserValidation.loginUserValidationSchema),
  AuthControllers.login,
)

export const AuthRoutes = router
