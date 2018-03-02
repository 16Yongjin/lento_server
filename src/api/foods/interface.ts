import { Document } from 'mongoose'

export interface IFoodDocument extends Document {
  name: string,
  type?: string,
  time?: string,
  menu?: string,
  lat?: number,
  lng?: number,
  images?: Array<string>
}
