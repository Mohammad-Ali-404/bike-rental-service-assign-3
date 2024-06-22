import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcryptjs'

// Define the user schema
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email uniqueness
    },
    password: {
      type: String,
      required: true,
      select: false, // By default, do not select the password field
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
      default: 'user', // Default role is 'user'
    },
  },
  {
    timestamps: true,
  },
)

// Pre-save middleware to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Only hash the password if it has been modified (or is new)
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    )
  }
  next()
})

// Instance method to remove the password field from the response
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

// Static method to compare the provided plain text password with the hashed password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return bcrypt.compare(plainTextPassword, hashPassword)
}

// Static method to check if a user exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return User.findOne({ email }).select('+password')
}

// Create and export the User model
export const User = model<TUser, UserModel>('User', userSchema)
