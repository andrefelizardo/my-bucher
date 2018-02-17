const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: String,
  author: String,
  category: String,
  cover: String,
  loan: {
    status: {
      type: Boolean,
      default: false
    },
    friend: {
      type: String,
      default: null
    }
  },
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Book', schema)
