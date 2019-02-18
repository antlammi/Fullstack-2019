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
        if (body.username === undefined){
            return response.status(400).json({error:'username missing'})
        } else if (body.username.length < 3){
            return response.status(400).json({error:'username too short'})
        }
        if (body.password === undefined){
            return response.status(400).json({error: 'password missing'})
        } else if (body.password.length<3 ){
   
            return response.status(400).json({error: 'password too short'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
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