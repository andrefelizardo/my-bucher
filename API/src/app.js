const express = require('express')
const mongoose = require('mongoose')
const config = require('../config')
const bodyParser = require('body-parser')

const app = express()
mongoose.connect(config.connectionString)

const Book = require('../models/book')

const indexRoute = require('./routes/index-route')
const booksRoute = require('./routes/books-route')

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use('/', indexRoute)
app.use('/books', booksRoute)

module.exports = app
