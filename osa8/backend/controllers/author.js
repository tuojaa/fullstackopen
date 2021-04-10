const Author = require('../models/author')

const authorCount = async () => {
  const result = await Author.count()
  return result
}

const allAuthors = async () => {
  const result = await Author.find({})
  return result
}

const addAuthor = async (name) => {
  const newAuthor = new Author({ name })
  const result = await newAuthor.save()
  return result
}

const getAuthorByName = async (name) => {
  return await Author.findOne({ name })
}

const getOrCreateAuthor = async (name) => {
  return (await getAuthorByName(name)) || (await addAuthor(name))
}

const editAuthor = async (name, setBornTo) => {
  const author = await getAuthorByName(name)
  console.log("editAuthor query: ", name, author)
  if(!author)
    return null
  const result = await Author.findByIdAndUpdate( author._id, { name, born: setBornTo } )
  console.log("editAuthor result: ", result)
  return result
}

module.exports = {
  authorCount,
  allAuthors,
  addAuthor,
  getAuthorByName,
  getOrCreateAuthor,
  editAuthor
} 