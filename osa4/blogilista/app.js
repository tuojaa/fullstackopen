const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('express-async-errors')

const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')
const app = express()

app.use(tokenExtractor)
app.use(userExtractor)
app.use(cors())
app.use(express.json())

app.use(morgan((tokens, req, res) => {
    let fields = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if (tokens.method(req, res) === 'POST') {
        fields = fields.concat(JSON.stringify(req.body))
    }
    return fields.join(' ')
}))

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
