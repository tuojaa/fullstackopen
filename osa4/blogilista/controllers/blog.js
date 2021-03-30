const { Blog } = require('../models/blog')
const { User } = require('../models/user')

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => (blog.toJSON()))).end()
})

blogRouter.post('/', async (request, response) => {
    if(!request.user) {
        response.status(401).end()
        return
    }

    const blogData = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: request.user
    }

    if(!blogData.title || !blogData.author) {
        response.status(400).end()
        return
    }

    const blog = new Blog(blogData)

    const result = await blog.save()

    request.user.blogs.push(result.id)
    await request.user.save()

    response.status(201).json( { ...result._doc, id: result.id })
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(!blog) {
        response.status(404).end()
    }
    if(blog.user.toString() !== request.user.id.toString()) {
        response.status(401).end()
        return
    }
    await blog.delete()
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blogData = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0
    }

    if(!blogData.title || !blogData.author) {
        response.status(400).end()
        return
    }

    await Blog.findByIdAndUpdate(request.params.id, blogData)
    response.status(204).end()
})


module.exports = blogRouter