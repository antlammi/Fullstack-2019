import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useField from './hooks/index'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  console.log(props)
  const newBlogTitle = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogurl = useField('text')
  const username = useField('text')
  const password = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortFunction) )
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
      props.setNotification('Login successful', 5)
    } catch (exception) {
      username.reset()
      password.reset()
      props.setNotification('käyttäjätunnus tai salasana virheellinen',5)
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
        props.setNotification(`a new blog: ${blogObject.title} by ${blogObject.author} added` , 5)

      }
    } catch (exception){
      props.setNotification('error creating blog', 5)
    }
  }
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>

        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  const sortFunction = (a,b) => {
    if (a.likes === b.likes) {
      return 0
    } else {
      return(a.likes > b.likes) ? -1 : 1
    }
  }
  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>

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

        {blogs.map(blog => <Blog key={blog.id} current_user={user} blog={blog} />)}

      </div>



    )
  }

  return(
    <div>
      <Notification/>
      {(user === null && loginForm())}
      {(user !== null && blogForm())}
    </div>
  )

}
const MapDispatchToProps = { setNotification }
const ConnectedApp = connect(null, MapDispatchToProps)(App)
export default ConnectedApp