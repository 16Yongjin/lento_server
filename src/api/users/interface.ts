import { Document } from 'mongoose'

export interface IUserUploadDocument extends Document {
  to?: string
  name?: string
  images: Array<string>
}
