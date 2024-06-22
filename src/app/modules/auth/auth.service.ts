import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { User } from '../user/user.model'
import { TUser } from '../user/user.interface'
import AppError from '../../errors/AppError'

const signUp = async (payload: TUser) => {
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This email already exists another user',
    )
  }
  const result = await User.create(payload)
  return result
}

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select('+password')
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists')
  }

  const match = await bcrypt.compare(payload?.password, user?.password)
  if (!match) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is incorrect')
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user._id,
  }

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires as string,
  })

  return {
    token: token,
    data: user,
  }
}

export const AuthServices = {
  signUp,
  login,
}
