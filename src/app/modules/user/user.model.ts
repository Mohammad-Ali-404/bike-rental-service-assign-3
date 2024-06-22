import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcryptjs'

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

// remove password form my response
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return bcrypt.compare(plainTextPassword, hashPassword)
}

// check user exists provide user email then send true
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}

export const User = model<TUser, UserModel>('Users', userSchema)
