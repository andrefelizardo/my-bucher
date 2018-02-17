const app = require('../src/app')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

function normalizePort (value) {
  const port = parseInt(value, 10)

  if (isNaN(port)) {
    return value
  }

  if (port >= 0) {
    return port
  }

  return false
}

const server = http.createServer(app)

server.listen(port)

console.log('myBucher API rodando na porta', port)
