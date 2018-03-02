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
  read (id?: string): Promise<IFood>
  updateFood (id: string, data: any): Promise<IFood>
  updateImages (id: string, imagePaths: Array<string>): Promise<IFood>
  delete (id: string): Promise<IFood>
  deleteImage (id: string, imagesPath: Array<string>): Promise<IFood>
  random (): Promise<IFood>
  search (query: string, type: string): Promise<IFood>
  readShortId (shortId: string): Promise<IFood>
  randomShortId (): Promise<IFood>
}

FoodSchema.statics.read = function (id: string): Promise<IFood> {
  return id ? this.findById(id) : this.find()
}

FoodSchema.statics.updateFood = async function (id: string, data: any): Promise<IFood> {
  await this.findByIdAndUpdate(id, data)
  return this.findById(id)
}

FoodSchema.statics.updateImages = async function (id: string, imagePaths: Array<string>): Promise<IFood> {
  await this.findByIdAndUpdate(id, {
    $push: { images: { $each: imagePaths } }
  })
  return this.findById(id)
}

FoodSchema.statics.delete = function (id: string): Promise<IFood> {
  return this.findByIdAndRemove(id)
}

FoodSchema.statics.deleteImage = async function (id: string, imagesPath: Array<string>): Promise<IFood> {
  await this.findByIdAndUpdate(id, {
    $pull: { images: imagesPath }
  })
  return this.findById(id)
}

FoodSchema.statics.random = function (): Promise<IFood> {
  return this.aggregate().sample(1).exec().then((r: any): any => r[0])
}

FoodSchema.statics.search = function (query: string, type = 'name'): Promise<IFood> {
  return this.find({ [type]: { $regex: new RegExp(query), $options: 'i' } })
    .limit(10)
    .exec()
}

let IdPrefix = ''
FoodSchema.statics.readShortId = async function (shortId: string): Promise<IFood> {
  if (!IdPrefix) {
    await this.find({}).then((foods: any): any => {
      IdPrefix = foods[0]._id.toString().slice(0, -5)
    })
    console.log('id prefix is', IdPrefix)
  }

  return this.findById(IdPrefix + shortId)
}

FoodSchema.statics.randomShortId = async function (): Promise<IFood> {
  const food = await this.aggregate().sample(1).exec().then((r: any): any => r[0])
  food._id = food._id.toString().slice(-5)
  return food
}

export const Food: IFoodModel = model<IFood, IFoodModel>('food', FoodSchema)

export default Food
