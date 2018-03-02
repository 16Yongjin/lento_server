import { Schema, Model, model } from 'mongoose'
import Food from 'api/foods/model'
import { IUserUploadDocument } from './interface'

export const UserUploadSchema = new Schema({
  to: String,
  name: String,
  images: {
    type: [String],
    required: true
  }
})

export interface IUserUpload extends IUserUploadDocument {}

export interface IUserUploadModel extends Model<IUserUpload> {
  read (id?: string): Promise<IUserUpload>
  saveImage (id: string, image: string, to: string): Promise<IUserUpload>
  deleteImage (id: string, image: string): Promise<IUserUpload>
}

UserUploadSchema.statics.read = function (id?: string): Promise<IUserUpload> {
  return id ? this.findById(id) : this.find({})
}

UserUploadSchema.statics.saveImage = async function (id: string, image: string, to: string): Promise<IUserUpload> {
  await this.findByIdAndUpdate(id, {
    $pull: { images: image }
  })
  await Food.updateImages(to, [image])
  return this.findById(id)
}

UserUploadSchema.statics.deleteImage = async function (id: string, image: string): Promise<IUserUpload> {
  await this.findByIdAndUpdate(id, {
    $pull: { images: image }
  })
  const userUpload = await this.findById(id)
  if (userUpload.images.length > 0) {
    return userUpload
  }

  await this.findByIdAndRemove(id)
  return null
}

export const UserUpload: IUserUploadModel = model<IUserUpload, IUserUploadModel>('UserUpload', UserUploadSchema)

export default UserUpload
