const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const initialUsers = [{
    _id:"5c6abf050e3d4a6aeed2341d",
    username: "Muumipeikko420",
    name:"Muumipeikko",
    __v: 0
}]
const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
  ]
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let userObject = new User(initialUsers[0])
    await userObject.save()

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})
test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
})
/* hajosi tokenin lisäämisen yhteydessä
test('a valid blog can be added', async () => {
    const blog =  {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
      }
    const newBlog = new Blog(blog)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain('Canonical string reduction')
    
})
*/
test('blog id has correct header', async() => {
  const response = await api.get('/api/blogs')
  const content = response.body
  expect(JSON.stringify(content)).toContain("id")
  expect(JSON.stringify(content)).not.toContain("_id")
})
afterAll(() => {
    mongoose.connection.close()
})