'use strict'
const mongoose = require('mongoose')

let db = null

module.exports = config => {
  // ✅ Establecer valores directamente (sin depender de config)
  const uri = 'mongodb://localhost:27017'
  const env = 'production'
  const database = 'eai'
  
  console.log('uri', uri)
  console.log('database', database)
  console.log('env', env)
  
  const opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    dbName: database
  }

  let mongoServer

  const connect = async (envParam) => {
    console.log('connect ')
    if (db) {
      return db
    }
    console.log('db initial', db)
    try {
      if (envParam === 'test') {
        console.log('1')
        const { MongoMemoryServer } = require('mongodb-memory-server')
        mongoServer = await MongoMemoryServer.create(); 
        const mongoUri = mongoServer.getUri();
        db = await mongoose.connect(mongoUri, opt)
        return db
      }
      console.log('2')
      console.log('Connecting to:', uri)
      db = await mongoose.connect(uri, opt)
      console.log('MongoDB connected successfully to', database)
    } catch (error) {
      console.error('MongoDB connection error:', error)
      const errorMenssage = {
        status: 500,
        menssage: 'Error de conexión con la base de datos',
        error
      }
      throw errorMenssage
    }

    mongoose.Promise = global.Promise
    return db
  }

  const close = async () => {
    if (envParam === 'test') {
      await mongoServer.stop()
    }
    if (db) {
      await db.disconnect()
      db = null
    }
  }

  return {
    connect,
    close
  }
}