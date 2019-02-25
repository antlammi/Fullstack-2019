import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useField from './hooks/index'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)


  const newBlogTitle = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogurl = useField('text')
  const username = useField('text')
  const password = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      username.reset()
      password.reset()
      setNotificationMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout((() => {setNotificationMessage(null)}), 5000)
    }


  }
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogurl.value
    }
    try{
      if (await blogService.create(blogObject)){
        setBlogs(await blogService.getAll())
        setNotificationMessage(`a new blog: ${blogObject.title} by ${blogObject.author} added` )
        setTimeout((() => {setNotificationMessage(null)}), 5000)
      }
    } catch (exception){
      setNotificationMessage('error creating blog')
      setTimeout((() => {setNotificationMessage(null)}), 5000)
    }
  }
  const loginForm = () => {
    return (

      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          notificationMessage={notificationMessage}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage}/>
        {user.name} logged in <br/><br/>
        <button type="logout" onClick={(() => {
          window.localStorage.removeItem('loggedBlogappUser')
          window.location.reload()
        })}>
            logout
        </button>
        <Togglable buttonLabel='create new'>
          <BlogForm title={newBlogTitle} author={newBlogAuthor} url={newBlogurl} handleSubmit={handleNewBlog}/>
        </Togglable>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>



    )
  }

  return(
    <div>
      {(user === null && loginForm())}
      {(user !== null && blogForm())}
    </div>
  )

}

export default App