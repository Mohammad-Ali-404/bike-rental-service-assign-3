import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'

const router = Router()

router.get('/me', auth('admin', 'user'), UserController.getUserProfile)

// update profile for user
router.put(
  '/me',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUserProfile,
)

export const UserRoutes = router
