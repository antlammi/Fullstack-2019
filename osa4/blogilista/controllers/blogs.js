const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog=>blog.toJSON()))
    })
})

blogsRouter.post('', (request, response) => {
    const body = request.body
    console.log(request.body)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

  blog
    .save()
    .then(result => {
      response.status(201).json(result.toJSON())
    })
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