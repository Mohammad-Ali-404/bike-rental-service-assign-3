import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

// get user profile controller
const getUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getUserProfileFromDB(req.user)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  })
})

// update user controller
const updateUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIntoDB(req.body, req.user)
  console.log(result)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  })
})

export const UserController = {
  getUserProfile,
  updateUserProfile,
}
