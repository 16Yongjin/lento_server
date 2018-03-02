import mongoose = require('mongoose')
import config from 'configuration'

mongoose.Promise = global.Promise

const url = config.get('MONGO_URL')
const db = config.get('MONGO_DATABASE_NAME')

export const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${url}/${db}`, {
      useMongoClient: true
    })

    const connection = mongoose.connection
    connection.on('error', reject)
    connection.once('open', resolve)
  })
}
