const request = require('supertest')
const database = require('database')
const Foods = require('api/foods/controller')
const {
  shortenUrl,
  longToShort,
  getMapUrl,
  getLongUrl
} = require('api/kakao/getMapUrl')

beforeAll(() => {
  database.connect()
})

describe('routes: foods', () => {
  // test('should respond as expected', async () => {
  //   const response = await request(app).get('/foods')
  //   expect(response.status).toEqual(200)
  //   expect(response.type).toEqual('application/json')
  //   // expect(response.body).toEqual([])
  // })

  test('should get random food', async () => {
    const food = await Foods.random()
    expect(food.name)
  })

  test('should shorten url', async () => {
    const shortUrl = await shortenUrl('www.google.com')
    expect(shortUrl).toEqual('https://goo.gl/fbsS')
  })

  test('should get long url', async () => {
    const longUrl = getLongUrl('123', '345')
    expect(longUrl).toEqual('https://www.google.co.kr/maps/place/123,345/@18z')
  })
})