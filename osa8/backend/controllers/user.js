const User = require('../models/user')
const jwt = require('jsonwebtoken')

const config = require('../utils/config')
const { UserInputError } = require('apollo-server')

const createUser = async (username, favoriteGenre) => {
  const user = new User({ username, favoriteGenre })

  return await user.save()
}

const login = async (username, password) => {
  const user = await User.findOne({ username: username })

  if ( !user || password !== 'secret' ) {
    throw new UserInputError("wrong credentials")
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return { value: jwt.sign(userForToken, config.SECRET) }
}

const getUserByToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, config.SECRET)
  } catch(error) {
    return null
  }  
  return await User.findById(decodedToken.id)
}

module.exports = {
  createUser,
  login,
  getUserByToken
}