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

exports.update = async (id, data) => {
  await Book.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      author: data.author,
      description: data.description,
      category: data.category,
      cover: data.cover,
      loan: data.loan
    }
  })
}

exports.loan = async (id, data) => {
  await Book.findByIdAndUpdate(id, {
    $set: {
      loan: data.loan
    }
  })
}
