const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const { authorCount, allAuthors, getOrCreateAuthor, editAuthor } = require('./controllers/author')
const { bookCount, allBooks, addBook } = require('./controllers/book')
const { createUser, login, getUserByToken } = require('./controllers/user')
const config = require('./utils/config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')



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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => await authorCount(),
    bookCount: async () => await bookCount(),
    allBooks: async (root, args) => {
      var result = await allBooks(args)
      return result
    },
    allAuthors: async () => await allAuthors(),
    me: async (root, args, context) => {
      console.log("me", context.currentUser)  
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      console.log("bookcount root: ", root)
      return await bookCount(root.id)
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      return await createUser(args.username, args.favoriteGenre)
    },
    login: async (root, args) => {
      return await login(args.username, args.password)
    },
    addBook: async (root, args, context) => {
      if(!context.currentUser) {
        throw new UserInputError("not logged in!")
      }
      const authorName = args.author
      try {
        const author = await getOrCreateAuthor(authorName)
        const result = await addBook({ ...args, author })
        pubsub.publish('BOOK_ADDED', { bookAdded: result })
        return result
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {      
      if(!context.currentUser) {
        throw new UserInputError("not logged in!")
      }
      try {
        return await editAuthor(args.name, args.setBornTo)
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)      
      try {
        const currentUser = await getUserByToken(token)
        return { currentUser }  
      } catch(error) {
        console.error("Auth failed: ", error)
      }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})