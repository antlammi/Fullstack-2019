const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User =require('../models/user')
const jwt = require('jsonwebtoken')
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}
blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(note=> note.toJSON()))
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const oldblog = await Blog.findById(request.params.id)
   
    var user
    if (body.user !== undefined){
        user = await User.findById(body.user)
    } 
    const blog = {
        title: body.title ? body.title : oldblog.title,
        author: body.author? body.author : oldblog.author,
        url:body.url? body.url:oldblog.url,
        likes:body.likes?body.likes:oldblog.likes,
        user:user?user:oldblog.user
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
        response.json(updatedBlog.toJSON())
    }).catch(error => response.status(400).json({error:'Bad Request'}))
})

blogsRouter.post('/',async (request, response) => {
    const body = request.body
    console.log(body)
    const token = getTokenFrom(request)
    

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        console.log(decodedToken)
        if (!token || !decodedToken.id){
            return response.status(401).json({error: 'token missing or invalid'})
        }
        const user = await User.findById(decodedToken.id)
        if (body.title === undefined||body.url === undefined) return response.status(400).json({error: 'bad request'})
        
        const blog = new Blog({
            
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
            ? body.likes : 0,
            user: user.id
          })
        console.log(blog)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch(exception){
        console.log('error while posting blog')
    }
  
    
})
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception){
        next(exception)
    }
})
module.exports = blogsRouter