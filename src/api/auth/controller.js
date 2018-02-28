const jwt = require('jsonwebtoken')
const User = require('./model');
const secret = require('configuration').get('SECRET')
const jwt_opts = require('configuration').get('JWT_OPTIONS')

// const verifyToken = token => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) reject(err)
//       else resolve(decoded)
//     })
//   })
// }

module.exports = {
  async register (ctx) {
    try {
      const { username, password } = ctx.request.body

      const existingUser = await User.findOneByUsername(username)
      if (existingUser) 
        throw new Error('username exists')

      const newUser = await User.create(username, password)

      const count = await User.getCount()
      if (count === 1)
        await newUser.assignAdmin()

      ctx.body = { message: 'registered successfully' }
    } catch ({ message }) {
      ctx.status = 409
      ctx.body = { message }
    }
  },
  async login (ctx) {
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

      if (user.admin) 
        payload.admin = true

      const token = jwt.sign(payload, secret, jwt_opts)

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
  async check (ctx) {
    ctx.body = ctx.state.user
  }
}