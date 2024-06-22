import httpStatus from 'http-status'
import { TBike } from './bike.interface'
import { Bike } from './bike.model'
import AppError from '../../errors/AppError'

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload)
  return result
}

// get all bikes form database
const getAllBikesFromDB = async () => {
  const result = await Bike.find()

  return result
}

// update bike from database
const updateBikeIntoDB = async (payload: Partial<TBike>, id: string) => {
  const findBike = await Bike.findById(id)

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found')
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true })

  return result
}

// delete bike from database
const deleteBikeFromDB = async (id: string) => {
  const findBike = await Bike.findById(id)

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found')
  }

  const result = await Bike.findByIdAndDelete(id, { new: true })

  return result
}

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
}
