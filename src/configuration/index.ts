const config = require('config')

export default {
  get: (key: string): any => {
    return process.env[key] || config[key]
  }
}
