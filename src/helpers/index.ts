import * as path from 'path'
import * as fs from 'mz/fs'

const isImage = ({ type }: { type?: string }): boolean => type && type.indexOf('image') !== -1
const isArray = ({ length }: { length?: number }): boolean => length && length > 1
const arrayfy = (arr: any): Array<any> => isArray(arr) ? arr : [arr]
const uid = () => Math.random().toString(36).slice(2)

const saveFile = async (file: any): Promise<string> => {
  const ext: string = file.name.slice(file.name.lastIndexOf('.'))
  const fileName: string = uid() + ext
  const filePath: string = path.join('src/uploads', fileName)
  await fs.rename(file.path, filePath)
  return fileName
}

export const deleteImageFile = async (imagePath: string): Promise<void> => {
  if (!imagePath) return
  try {
    const filePath = path.join('src/uploads', imagePath)
    await fs.unlink(filePath)
  } catch (e) {
    console.log('failed to delete image', e)
  }
}

export const saveImages = async ({ image }: any) => {
  console.log(typeof image)
  if (!image) return []
  try {
    return await Promise.all(
      arrayfy(image)
      .filter(isImage)
      .map(saveFile))
  } catch (e) {
    console.log('failed to save images', e)
  }
}

const isAdmin = (mw: any) => (ctx: any) => {
  if (!ctx.state.user.admin) {
    return ctx.status = 401
  }
  return mw(ctx)
}

const check = (cont: any) => (condition: any) => {
  for (let k in cont) {
    cont[k] = condition(cont[k])
  }
  return cont
}

export const adminGuard = (controller: object) => check(controller)(isAdmin)

export const getId = (ctx: any) => ctx.params.id
