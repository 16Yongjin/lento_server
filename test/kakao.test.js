const request = require('supertest')
const database = require('database')
const Foods = require('api/foods/controller')
const { app } = require('app')


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

  test('should get food recommendation', async () => {
    const response = await request(app).post('/kakao/message', { content: '식당 추천' })
    console.log(response.body)
  })


})
