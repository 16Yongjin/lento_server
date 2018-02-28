const Foods = require('api/foods/controller')
const { getMapUrl, getLongUrl } = require('./getMapUrl')
const keyboard = require('./keyboard')

const getRandom = async () => {
  try {
    const { name, type, time, menu, lat, lng } = await Foods.random()
    const location = (lat && lng) ? getLongUrl(lat, lng) : null
    console.log(location, lat, lng)
    const message = {
      text: `${name} ${type ? `(${type})` : ''}
      ${ time ? `영업시간: ${time}` : '' }
      ${ menu ? `메뉴: ${menu}` : '' }
      ${ location ? `위치: ${location}` : '' }`.split('\n').map(s => s.trim()).join('\n')
    }
    return { message, keyboard }
  }
  catch (e) {
    console.log('getRandom', e)
    return { error: '에러. ㅎㅎ;; ㅈㅅ.. ㅋㅋ!!' }
  }
}

module.exports = getRandom
