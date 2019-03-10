const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
beforeEach(async () => {
    await User.deleteMany({})
})

describe('user', ()=> {
   test('cannot be created without a password', async ()=> {
        const invalidUser = {
            username: "Muumipeikko420",
            name:"Muumipeikko"
        }

        await api.post('/api/users').send(invalidUser).expect(400, '{"error":"password missing"}')
      
    })

    test('cannot be created with a password that is too short', async()=>{
        const invalidUser = {
            username: "Muumipeikko420",
            name:"Muumipeikko",
            password:"m1"
        }

        await api.post('/api/users').send(invalidUser).expect(400, '{"error":"password too short"}')
      
    })
    test('cannot be created without a username', async()=>{
        const invalidUser = {
           
            name:"Muumipeikko",
            password:"m1"
        }

        await api.post('/api/users').send(invalidUser).expect(400, '{"error":"username missing"}')
      
    })
    test('cannot be created with username that is too short', async()=>{
        const invalidUser = {
            username:"mp",
            name:"Muumipeikko",
            password:"m1"
        }

        await api.post('/api/users').send(invalidUser).expect(400, '{"error":"username too short"}')
    })

    test('can be added', async()=>{
        const validUser = {
            username:"Muumipeikko420",
            name:"Muumipeikko",
            password:"muumitalo"
        }

        await api.post('/api/users').send(validUser).expect(200)
      
    })
})

afterAll(() => {
    mongoose.connection.close()
})