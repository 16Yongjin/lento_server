const Food = require('api/foods/model')
const keyboard = require('./keyboard')

const getRandom = async () => {
  try {
    const { _id, name, type, time, menu, lat, lng } = await Food.randomShortId()
    const message = {
      text: `${name} ${type ? `(${type})` : ''}
      
      ${ time ? `영업시간: ${time}` : '' }
      ${ menu ? `메뉴: ${menu}` : '' }
      https://lento.in/foods/${_id}`
        .split('\n').map(s => s.trim()).join('\n').replace(/\n{3,}/g, '\n\n')
    }
    return { message, keyboard }
  }
  catch (e) {
    console.log('getRandom', e)
    return { error: '에러. ㅎㅎ;; ㅈㅅ.. ㅋㅋ!!' }
  }
}

module.exports = getRandom
