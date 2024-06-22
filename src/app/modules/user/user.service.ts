import { JwtPayload } from 'jsonwebtoken'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TUser } from './user.interface'

// get profile user
const getUserProfileFromDB = async (loggedUser: JwtPayload) => {
  // check user exist
  const user = await User.isUserExistsByEmail(loggedUser?.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  const result = await User.findById(loggedUser?.id)

  return result
}

// get profile user
const updateUserIntoDB = async (
  payload: Partial<TUser>,
  loggedUser: JwtPayload,
) => {
  // check user exist
  const user = await User.isUserExistsByEmail(loggedUser?.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  const result = await User.findOneAndUpdate(
    { _id: loggedUser?.id },
    {
      $set: payload,
    },
    { new: true },
  )

  return result
}

export const UserServices = {
  getUserProfileFromDB,
  updateUserIntoDB,
}
