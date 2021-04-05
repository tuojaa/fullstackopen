const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const { User } = require('../models/user')

const api = supertest(app)


describe('User API', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('New user is created via POST', async () => {
        const userData = {
            username: 'paavo',
            name: 'Paavo Pesusieni',
            password: 'squarepants'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(201)
    })

    test('New user is created via POST and returned via GET', async () => {
        const userData = {
            username: 'paavo',
            name: 'Paavo Pesusieni',
            password: 'squarepants'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(201)

        const result = await api
            .get('/api/users')
            .expect(200)
        expect(result.body.length).toBe(1)
        expect(result.body[0].id).toBeDefined()
        expect(result.body[0].username).toBe('paavo')
        expect(result.body[0].name).toBe('Paavo Pesusieni')
        expect(result.body[0].password).not.toBeDefined()
        expect(result.body[0].passwordHash).not.toBeDefined()
    })


    test('New user is not created via POST if username is missing', async () => {
        const userData = {
            name: 'Paavo Pesusieni',
            password: 'squarepants'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(400)
    })

    test('New user is not created via POST if name is missing', async () => {
        const userData = {
            username: 'paavo',
            password: 'squarepants'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(400)
    })

    test('New user is not created via POST if username is missing', async () => {
        const userData = {
            username: 'paavo',
            name: 'Paavo Pesusieni',
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(400)
    })

    test('New user is not created via POST if username is too short', async () => {
        const userData = {
            username: 'ab',
            name: 'Paavo Pesusieni',
            password: 'squarepants'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(400)
    })

    test('New user is not created via POST if password is too short', async () => {
        const userData = {
            username: 'paavo',
            name: 'Paavo Pesusieni',
            password: 'sq'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(400)
    })

    test('Unique username constraint is honored', async () => {
        const userData = {
            username: 'paavo',
            name: 'Paavo Pesusieni',
            password: 'squarepants'
        }
        await api
            .post('/api/users')
            .send(userData)
            .expect(201)

        const userData2 = {
            username: 'paavo',
            name: 'Paavo Pesusieni the Second',
            password: 'squarepants2'
        }
        await api
            .post('/api/users')
            .send(userData2)
            .expect(400)
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})