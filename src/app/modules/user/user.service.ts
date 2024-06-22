import { TUser } from './user.interface'
import { User } from './user.model'

const getUserProfileFromDB = async () => {
  const result = await User.find()
  return result
}

const updateUserProfileIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
export const academicFacultyServices = {
  getUserProfileFromDB,
  updateUserProfileIntoDB,
}
