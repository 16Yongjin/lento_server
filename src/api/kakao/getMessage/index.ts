import getRandom from './getRandom'
import { getCafeteriaMessage, cafeteriaKeyboard } from './getCafeteriaMenu'

export default async (content: string): Promise<object> => {
  switch (content) {
    case '식당 추천':
      return getRandom()
    case '학식':
      return cafeteriaKeyboard
    case '인문관 점심':
    case '인문관 저녁':
    case '교수회관 점심':
    case '교수회관 저녁':
      return getCafeteriaMessage(content)
  }
}
