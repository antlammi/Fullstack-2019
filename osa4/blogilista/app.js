const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogSchema = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
app.use(bodyParser.json())
const Blog = blogSchema
app.use('/api/blogs', blogsRouter)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true})

app.use(cors())


module.exports = app
