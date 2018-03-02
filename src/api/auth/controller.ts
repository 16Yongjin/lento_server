import * as jwt from 'jsonwebtoken'
import User from './model'
import config from 'configuration'

const secret = config.get('SECRET')
const jwtOpts = config.get('JWT_OPTIONS')

export default {
  async register (ctx: any) {
    try {
      const { username, password } = ctx.request.body

      const existingUser = await User.findOneByUsername(username)
      if (existingUser) {
        throw new Error('username exists')
      }

      const newUser = await User.create(username, password)

      const count = await User.getCount()
      if (count === 1) {
        newUser.assignAdmin()
      }

      ctx.body = { message: 'registered successfully' }
    } catch (err) {
      console.log(err)
      ctx.status = 409
      ctx.body = { message: err.message }
    }
  },
  async login (ctx: any) {
    try {
      const { username, password } = ctx.request.body
      const user = await User.findOneByUsername(username)
      if (!user || !user.verify(password)) {
        throw new Error('login failed')
      }
      const payload = {
        _id: user._id,
        username
      }

      if (user.admin) {
        Object.assign(payload, { admin: true })
      }

      const token = jwt.sign(payload, secret, jwtOpts)

      ctx.body = {
        message: 'logged in successfully',
        token
      }
    } catch (err) {
      console.log(err)
      ctx.status = 403
      ctx.body = { message: err.message }
    }
  },
  async check (ctx: any) {
    ctx.body = ctx.state.user
  }
}
