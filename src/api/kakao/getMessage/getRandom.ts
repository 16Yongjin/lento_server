import Food from 'api/foods/model'
import keyboard from './keyboard'

const getRandom = async (): Promise<object> => {
  try {
    const { _id, name, type, time, menu } = await Food.randomShortId()
    const menuArr = menu.split(/ ?, ?/).slice(0, 10)
    const menus = menuArr.length < 10 ? menuArr.join(', ') : menuArr.join(', ') + ' 등'
    const message = {
      text: `${name} ${type ? `(${type})` : ''}

      ${ time ? `영업시간: ${time}` : '' }
      ${ menu ? `메뉴: ${menus}` : '' }
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
