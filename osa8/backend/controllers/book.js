const Book = require('../models/book')

const allBooks = async () => {
  const result = await Book.find({}).populate("author")
  console.log("allBooks: ", result)
  return result
}

const bookCount = async (author) => {
  const result = await Book.find({ author }).count()
  return result
}

const addBook = async ({ title, author, published, genres }) => {
  const newBook = new Book({ title, author, published, genres })
  const result = await newBook.save()
  return result
}

module.exports = {
  allBooks,
  addBook,
  bookCount
}