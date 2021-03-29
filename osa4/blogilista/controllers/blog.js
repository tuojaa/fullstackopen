const { Blog } = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => ({ ...blog, id: blog._id })))
})

blogRouter.post('/', async (request, response) => {
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

    const blog = new Blog(blogData)

    const result = await blog.save()
    response.status(201).json( { ...result._doc, id: result.id })
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
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