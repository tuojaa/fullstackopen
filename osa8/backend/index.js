const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const { authorCount, allAuthors, getOrCreateAuthor, editAuthor } = require('./controllers/author')
const { bookCount, allBooks, addBook } = require('./controllers/book')
const config = require('./utils/config')
const mongoose = require('mongoose')

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!  
    bookCount: Int!  
    born: Int
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await authorCount(),
    bookCount: async () => await bookCount(),
    allBooks: async (root, args) => {
      var result = await allBooks()
      return result
    },
    allAuthors: async () => await allAuthors()
  },
  Author: {
    bookCount: (root) => {
      return 0
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author
      const author = await getOrCreateAuthor(authorName)
      const result = await addBook({ ...args, author })
      return result
    },
    editAuthor: async (root, args) => {      
      console.log("mutation editauthor", args)
      return await editAuthor(args.name, args.setBornTo)
    }
  }
}

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})