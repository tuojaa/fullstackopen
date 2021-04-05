const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const tokenExtractor = (request, response, next) => {
    request.token = getTokenFrom(request)
    next()
}

const userExtractor = async (request, response, next) => {
    if(request.token) {
        const { id } = jwt.verify(request.token, process.env.SECRET)
        request.user = await User.findById(id)
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.name, error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ reason: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({ reason: error.message })
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ reason: 'invalid token' })
    }
    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ reason: 'token expired' })
    }
    next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}