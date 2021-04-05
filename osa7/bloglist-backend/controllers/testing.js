const bcrypt = require('bcrypt')
const router = require('express').Router()
const { Blog } = require('../models/blog')
const { User } = require('../models/user')

router.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const createUser = async (username, name, password) => {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
    
        const user = new User({
            username, name, passwordHash
        })
    
        return await user.save()
    }

    const paavo = await createUser('paavo', 'Paavo M. Pesusieni', 'squarepants')
    const mikko = await createUser('mikko', 'Mikko X. Mallikas', 'model_man')

    const blogData = {
        title: 'One Blog Already Here',
        author: 'A. Uthor',
        url: 'http://example.com/',
        likes: 4,
        user: mikko
    }

    const blog = new Blog( blogData )

    await blog.save()

    response.status(204).end()
})

module.exports = router