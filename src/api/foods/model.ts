import { Schema, Model, model } from 'mongoose'
import { IFoodDocument } from './interface'

export const FoodSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, '음식점 이름을 입력해주세요.']
  },
  type: String,
  time: String,
  menu: String,
  lat: Number,
  lng: Number,
  images: {
    type: [String],
    default: []
  }
})

export interface IFood extends IFoodDocument {}

export interface IFoodModel extends Model<IFood> {
  read (id?: string): IFood
  updateFood (id: string, data: any): IFood
  updateImages (id: string, imagePaths: Array<string>): IFood
  delete (id: string): IFood
  deleteImage (id: string, imagesPath: Array<string>): IFood
  random (): IFood
  search (query: string, type: string): IFood
  readShortId (shortId: string): IFood
  randomShortId (): IFood
}

FoodSchema.statics.read = function (id: string) {
  return id ? this.findById(id) : this.find()
}

FoodSchema.statics.updateFood = async function (id: string, data: any) {
  await this.findByIdAndUpdate(id, data)
  return this.findById(id)
}

FoodSchema.statics.updateImages = async function (id: string, imagePaths: Array<string>) {
  await this.findByIdAndUpdate(id, {
    $push: { images: { $each: imagePaths } }
  })
  return this.findById(id)
}

FoodSchema.statics.delete = function (id: string) {
  return this.findByIdAndRemove(id)
}

FoodSchema.statics.deleteImage = async function (id: string, imagesPath: Array<string>) {
  await this.findByIdAndUpdate(id, {
    $pull: { images: imagesPath }
  })
  return this.findById(id)
}

FoodSchema.statics.random = function () {
  return this.aggregate().sample(1).exec().then((r: any): any => r[0])
}

FoodSchema.statics.search = function (query: string, type = 'name') {
  return this.find({ [type]: { $regex: new RegExp(query), $options: 'i' } })
    .limit(10)
    .exec()
}

let IdPrefix = ''
FoodSchema.statics.readShortId = async function (shortId: string) {
  if (!IdPrefix) {
    await this.find({}).then((foods: any): any => {
      IdPrefix = foods[0]._id.toString().slice(0, -5)
    })
    console.log('id prefix is', IdPrefix)
  }

  return this.findById(IdPrefix + shortId)
}

FoodSchema.statics.randomShortId = async function () {
  const food = await this.aggregate().sample(1).exec().then((r: any): any => r[0])
  food._id = food._id.toString().slice(-5)
  return food
}

export const Food: IFoodModel = model<IFood, IFoodModel>('food', FoodSchema)

export default Food
