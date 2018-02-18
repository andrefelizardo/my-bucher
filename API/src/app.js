const express = require('express')
const bodyParser = require('body-parser')
const compress = require('compression')
const mongoose = require('mongoose')
const config = require('../config')

const app = express()
mongoose.connect(config.connectionString)

const Book = require('../models/book')

const indexRoute = require('./routes/index-route')
const booksRoute = require('./routes/books-route')

app.use(compress())
app.use(bodyParser.json({
  limit: '100mb'
}))
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', indexRoute)
app.use('/books', booksRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  var html = '<!DOCTYPE html>'
  html += '<html>'
  html += '  <head>'
  html += '    <title></title>'
  html += '  </head>'
  html += '  <body>'
  html += '    <h1>' + err.message + '</h1>'
  html += '    <h2>' + err.status + '</h2>'
  html += '    <pre>' + err.stack + '</pre>'
  html += '  </body>'
  html += '</html>'
  res.send(html)
})

module.exports = app
