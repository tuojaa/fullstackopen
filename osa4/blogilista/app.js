const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blog')
const config = require('./utils/config')

const app = express()

app.use(cors())
app.use(express.json())

const mongoUrl =
  `mongodb+srv://tuomasjaanu:${config.MONGO_PASSWORD}@cluster0.dbkdb.mongodb.net/blogilista?retryWrites=true&w=majority`
console.log(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use('/api/blogs', blogRouter)

module.exports = app
