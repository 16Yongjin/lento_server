const request = require('request-promise')
const controller = require('api/kakao/contoller')

const shortenUrl = async (longUrl) => {
  const apiKey = 'AIzaSyBK2ifbglWFfGx2-eRWygKwQplWhISEpNA'
  const apiUri = `https://www.googleapis.com/urlshortener/v1/url?key=${apiKey}`
  const options = {
    method: 'POST',
    uri: apiUri,
    body: { longUrl },
    json: true
  };
  const { id } = await request(options)
  return id
}

const longToShort = async (longUrl) => {
  try {
  // 일단 캐쉬된 메모리 가져오기
    const url = await controller.find(longUrl)
    if (url) {
      return url.shortUrl
    }
    // 없으면 API 돌려서 가져오기
    const shortUrl = await shortenUrl(longUrl)
    // 캐쉬도 하기
    await controller.add(shortUrl, longUrl)
    return shortUrl
  } catch (e) {
    console.log('getShortUrl Error', e)
    // 오류 났으니까 그냥 그대로
    return longUrl 
  }
}

const getLongUrl = (lat, lng) => {
  return `https://www.google.co.kr/maps/place/${lat},${lng}/@18z`
}

const getMapUrl = (lat, lng) => longToShort(getLongUrl(lat, lng))

module.exports = {
  shortenUrl,
  longToShort,
  getLongUrl,
  getMapUrl
}