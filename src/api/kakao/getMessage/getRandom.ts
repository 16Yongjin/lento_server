import Food from 'api/foods/model'
import keyboard from './keyboard'

const getRandom = async (): Promise<object> => {
  try {
    const { _id, name, type, time, menu } = await Food.randomShortId()
    const message = {
      text: `${name} ${type ? `(${type})` : ''}

      ${ time ? `영업시간: ${time}` : '' }
      ${ menu ? `메뉴: ${menu}` : '' }
      https://lento.in/foods/${_id}`
        .split('\n').map(s => s.trim()).join('\n').replace(/\n{3,}/g, '\n\n')
    }
    return { message, keyboard }
  } catch (e) {
    console.log('getRandom', e)
    return { error: '에러. ㅎㅎ;; ㅈㅅ.. ㅋㅋ!!' }
  }
}

export default getRandom
