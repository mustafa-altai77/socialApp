const mongoose = require('mongoose')
const http = require('http')

const app = require('./app')
const config = require('./config/config')
const socketAPI = require('./config/socket')

let server
global.__rootDir = __dirname
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log('Connected to MongoDB')
  server = http.createServer(app)
  const options = {
    cors: true,
    origins: ['*'],
  }
  socketAPI.io.attach(server, options)
  server.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
        console.log('Server closed')
      // process.exit(1);
    })
  } else {
    // process.exit(1);
  }
}

const unexpectedErrorHandler = (error) => {
  console.log(error)
  // exitHandler();
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.log('SIGTERM received')
  if (server) {
    server.close()
  }
})


