const bcrypt = require('bcrypt')
const { User } = require('../models/user')

const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title:1, url: 1, author: 1, likes: 1 })
    response.json(users.map(user => (user.toJSON()))).end()
})

userRouter.post('/', async (request, response) => {
    const username = request.body.username
    const name = request.body.name
    const password = request.body.password

    if(!username || !name || !password) {
        response.status(400).end()
        return
    }
    if(password.length < 3) {
        response.status(400).send({ reason: 'password must be longer' }).end()
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, name, passwordHash
    })

    const result = await user.save()
    response.status(201).json( { username, id: result.id }).end()
})

module.exports = userRouter