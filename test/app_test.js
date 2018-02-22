const request = require('supertest')
const app = require('app').app.listen(3000)
const database = require('database')

beforeAll(() => {
  database.connect()
})

afterEach(() => {
  app.close()
})

describe('routes: foods', () => {
  test('should respond as expected', async () => {
    const response = await request(app).get('/foods')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    // expect(response.body).toEqual([])
  })

  xtest('should create user', async () => {
    const res = await request(app)
                        .post('/foods')
                        .send({ data: { name: 'res' } })
    console.log( res.body )
  })
})