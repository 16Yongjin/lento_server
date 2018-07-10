import * as _ from 'lodash'
import { Schema, Model, model } from 'mongoose'
import { IFood, IFoodTypeCache } from './interface'

const foodTypeCache: IFoodTypeCache = {}

export const FoodSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, '음식점 이름을 입력해주세요.']
  },
  type: {
    type: String,
    index: true
  },
  time: String,
  menu: String,
  lat: Number,
  lng: Number,
  images: {
    type: [String],
    default: []
  },
  sensei: String,
  honbab: Number,
  honmono: String
})

export interface IFoodModel extends Model<IFood> {
  read (id?: string): Promise<IFood>
  readAll (): Promise<Array<IFood>>
  readType (type: string): Promise<Array<IFood>>
  paginateType (type: string, page: number, offset: number): Promise<Array<IFood>>
  updateFood (id: string, data: any): Promise<IFood>
  updateImages (id: string, imagePaths: Array<string>): Promise<IFood>
  delete (id: string): Promise<IFood>
  deleteImage (id: string, imagesPath: Array<string>): Promise<IFood>
  random (): Promise<IFood>
  search (query: string, type: string): Promise<IFood>
  readShortId (shortId: string): Promise<IFood>
  randomShortId (): Promise<IFood>
  randomWithImage (n: number): Promise<IFood>
}

FoodSchema.statics.read = function (id: string): Promise<IFood> {
  return this.findById(id)
}

FoodSchema.statics.readAll = function (): Promise<Array<IFood>> {
  return this.find()
}

FoodSchema.statics.readType = async function (type: string): Promise<Array<IFood>> {
  if (foodTypeCache[type]) {
    return foodTypeCache[type]
  }
  const foods = await this.find({ type })

  const imageFirstFood = foods.filter((food: IFood): boolean => food.images.length > 0)
    .concat(foods.filter((food: IFood): boolean => food.images.length <= 0))
  if (imageFirstFood.length > 0) {
    foodTypeCache[type] = imageFirstFood
  }
  return imageFirstFood
}

FoodSchema.statics.paginateType = async function (type: string, page: number = 1, offset: number = 12): Promise<Array<IFood>> {
  if (foodTypeCache[type]) {
    console.log('from cache')
    return foodTypeCache[type].slice((page - 1) * offset, page * offset)
  }

  const foods = await this.find({ type })
  const imageFirstFood = foods.filter((food: IFood): boolean => food.images.length > 0)
    .concat(foods.filter((food: IFood): boolean => food.images.length <= 0))
  if (imageFirstFood.length > 0) {
    foodTypeCache[type] = imageFirstFood
  }
  return imageFirstFood.slice((page - 1) * offset, page * offset)
}

FoodSchema.statics.updateFood = async function (id: string, data: any): Promise<IFood> {
  await this.findByIdAndUpdate(id, data)
  const updated = await this.findById(id)
  foodTypeCache[updated.type] = null
  console.log(updated.type)
  return updated
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
    await this.find({}).then((foods: Array<IFood>) => {
      IdPrefix = foods[0]._id.toString().slice(0, -5)
    })
    console.log('id prefix is', IdPrefix)
  }

  return this.findById(IdPrefix + shortId)
}

FoodSchema.statics.randomShortId = async function (): Promise<IFood> {
  const food = await this.aggregate().sample(1).exec().then((r: Array<IFood>): IFood => r[0])
  food._id = food._id.toString().slice(-5)
  return food
}

FoodSchema.statics.randomWithImage = async function (n: number): Promise<Array<Object>> {
  const foods = await this.find({ 'images.0': { $exists: true } })
  return _.sampleSize(foods, n).map(({ _id, name, images, type }: IFood) => ({
    name,
    type,
    images,
    _id: _id.toString().slice(-5)
  }))
}

export const Food: IFoodModel = model<IFood, IFoodModel>('food', FoodSchema)

export default Food
