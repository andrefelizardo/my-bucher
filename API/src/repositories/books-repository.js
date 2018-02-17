const mongoose = require('mongoose')
const Book = mongoose.model('Book')

exports.create = async (data) => {
  let book = new Book(data)
  await book.save()
}

exports.get = async () => {
  const res = await Book.find({})
  return res
}
