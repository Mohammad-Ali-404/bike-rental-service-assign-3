import { JwtPayload } from 'jsonwebtoken'
import { User } from './user.model'
import { TUser } from './user.interface'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'

// Get user profile from database
const getUserProfileFromDB = async (loggedUser: JwtPayload) => {
  // Check if the user exists by email
  const result = await User.isUserExistsByEmail(loggedUser?.email)
  return result
}

// Update user profile in database
const updateUserIntoDB = async (
  payload: Partial<TUser>,
  loggedUser: JwtPayload,
) => {
  if (!loggedUser?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User email is missing')
  }

  // Check if the user exists by email
  const user = await User.isUserExistsByEmail(loggedUser.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile not found')
  }

  // Update the user profile
  const result = await User.findOneAndUpdate(
    { _id: user?._id },
    { $set: payload },
    { new: true },
  )
  console.log(result, loggedUser.id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile not found')
  }
  return result
}

export const UserServices = {
  getUserProfileFromDB,
  updateUserIntoDB,
}
