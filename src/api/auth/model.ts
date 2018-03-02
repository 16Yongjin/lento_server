import { Schema, Model, model } from 'mongoose'
import { IUserDocument } from './interface'
import * as crypto from 'crypto'
import config from 'configuration'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  password: {
    type: String,
    required: true
  },
  create_on: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
})

export interface IUser extends IUserDocument {
  verify (password: string): boolean
  assignAdmin (): IUser
}

export interface IUserModel extends Model<IUser> {
  createUser (username: string, password: string): Promise<IUser>
  findOneByUsername (username: string): Promise<IUser>
  getCount (): Promise<number>
}

const encrypt = (password: string): string => {
  return crypto
    .createHmac('sha1', config.get('HASH_KEY'))
    .update(password)
    .digest('base64')
}

UserSchema.statics.createUser = function (username: string, password: string): Promise<IUser> {
  password = encrypt(password)
  const user = new this({ username, password })
  return user.save()
}

UserSchema.statics.findOneByUsername = function (username: string): Promise<IUser> {
  return this.findOne({ username }).exec()
}

UserSchema.statics.getCount = function (): Promise<number> {
  return this.count({}).exec()
}

// verify the password of the User documment
UserSchema.methods.verify = function (password: string): boolean {
  return this.password === encrypt(password)
}

UserSchema.methods.assignAdmin = function (): Promise<IUser> {
  this.admin = true
  return this.save()
}

export const User: IUserModel = model<IUser, IUserModel>('User', UserSchema)

export default User
