const mongoose = require('mongoose')
const Book = mongoose.model('Book')

exports.create = async (data) => {
  let book = new Book(data)
  await book.save()
}
