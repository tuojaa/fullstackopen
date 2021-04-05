const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const { User } = require('../models/user')

const api = supertest(app)


describe('User API', () => {
    beforeEach(async () => {
        await User.deleteMany({})

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

    test('User can log in', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'paavo', password: 'squarepants' })
            .expect(200)

        expect(result.body.token).toBeDefined()
        expect(result.body.username).toBe('paavo')
        expect(result.body.name).toBe('Paavo Pesusieni')
    })

    test('Wrong password does not work', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'paavo', password: 'wrongpass' })
            .expect(401)

        expect(result.body.token).not.toBeDefined()
        expect(result.body.username).not.toBeDefined()
        expect(result.body.name).not.toBeDefined()
    })

    test('Wrong username does not work', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'mikko', password: 'squarepants' })
            .expect(401)

        expect(result.body.token).not.toBeDefined()
        expect(result.body.username).not.toBeDefined()
        expect(result.body.name).not.toBeDefined()
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})