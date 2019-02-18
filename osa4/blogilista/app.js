const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogSchema = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

const Blog = blogSchema
app.use('/api/blogs', blogsRouter)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true})

app.use(cors())
app.use(bodyParser.json())

module.exports = app
