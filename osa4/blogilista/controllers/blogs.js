const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User =require('../models/user')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(note=> note.toJSON()))
})

blogsRouter.post('/',async (request, response) => {
    const body = request.body
    var user = await User.findOne({})
    if (body.userId !== undefined){
        user = await User.findById(body.userId)
    }
    console.log(request.body)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    try {
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