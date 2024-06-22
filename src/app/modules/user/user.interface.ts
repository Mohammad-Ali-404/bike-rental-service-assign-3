import { Model } from 'mongoose'

export type TUserRole = 'user' | 'admin'

export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: TUserRole
}
// make the statics method interface for user validation
export interface UserModel extends Model<TUser> {
  // check user exists using email interface
  isUserExistsByEmail(email: string): Promise<TUser>

  // password check interface
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}
