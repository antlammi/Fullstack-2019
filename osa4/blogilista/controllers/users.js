const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u=> u.toJSON()))
})
usersRouter.post('/', async(request, response, next) => {
    try {
        console.log(request.body)
        const body = request.body

        const saltRounds = 10
        console.log('crash point 1')
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        console.log('crash point 2')
        const user = new User({
            username: body.username,
            name:body.name,
            passwordHash
        })
        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception){
        console.log('error while saving user')
    }
})


module.exports = usersRouter