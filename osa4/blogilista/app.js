const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogRouter = require('./controllers/blog')
const config = require('./utils/config')
const { errorHandler } = require('./utils/middleware')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use('/api/blogs', blogRouter)

app.use(errorHandler)

module.exports = app
