const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const { Blog } = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


describe('get all blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.blogs.map(blog => new Blog(blog))

        await Promise.all(blogObjects.map(blog => blog.save()))
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('id is returned as id', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body[0].id).toBeDefined()
    })

    test('creating a blog via post increases blog count by one', async () => {
        expect((await helper.blogsInDb()).length).toBe(6)

        const newBlog = {
            title: 'Lorem Ipsum',
            author: 'A. Uthor',
            url: 'https://some.example.url/hello',
            likes: 12
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        expect((await helper.blogsInDb()).length).toBe(7)
    })

    test('creating a blog with no likes field will have it set to zero', async () => {

        const newBlog = {
            title: 'Lorem Ipsum',
            author: 'A. Uthor',
            url: 'https://some.example.url/hello',
        }
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        expect(result.body.likes).toBe(0)
    })

    test('creating a blog with no title field will result http status 400', async () => {
        expect((await helper.blogsInDb()).length).toBe(6)

        const newBlog = {
            author: 'A. Uthor',
            url: 'https://some.example.url/hello',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        expect((await helper.blogsInDb()).length).toBe(6)
    })

    test('creating a blog with no author field will result http status 400', async () => {
        expect((await helper.blogsInDb()).length).toBe(6)

        const newBlog = {
            title: 'Lorem Ipsum',
            url: 'https://some.example.url/hello',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        expect((await helper.blogsInDb()).length).toBe(6)
    })

    test('delete an existing blog succeeds', async () => {
        const existingBlogs = await helper.blogsInDb()
        expect(existingBlogs.length).toBe(6)

        const url = `/api/blogs/${existingBlogs[0]._id}`

        await api
            .delete(url)
            .expect(204)

        expect((await helper.blogsInDb()).length).toBe(5)
    })

    test('delete with bad id fails', async () => {
        const existingBlogs = await helper.blogsInDb()
        expect(existingBlogs.length).toBe(6)

        await api
            .delete(`/api/blogs/this_is_some_bad_id`)
            .expect(400)

        expect((await helper.blogsInDb()).length).toBe(6)
    })

    test('delete twice succeeds', async () => {
        const existingBlogs = await helper.blogsInDb()
        expect(existingBlogs.length).toBe(6)

        const url = `/api/blogs/${existingBlogs[0]._id}`

        await api
            .delete(url)
            .expect(204)

        await api
            .delete(url)
            .expect(204)

        expect((await helper.blogsInDb()).length).toBe(5)
    })

    test('update an existing blog succeeds', async () => {
        const existingBlogs = await helper.blogsInDb()
        expect(existingBlogs.length).toBe(6)

        const existingBlog = existingBlogs[0]

        const url = `/api/blogs/${existingBlog._id}`

        await api
            .put(url)
            .send( { ...existingBlog, likes: 100 })
            .expect(204)

        const existingBlogsAfter = await helper.blogsInDb()
        expect(existingBlogsAfter.length).toBe(6)
        const modifiedBlog = existingBlogsAfter.find(blog => (blog._id.toString()===existingBlog._id.toString()))
        expect(modifiedBlog.likes).toBe(100)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})

