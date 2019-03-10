import React, { useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useField from './hooks/index'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, incrementLikes, initializeBlogs } from './reducers/blogReducer'
import { setUser, delUser } from './reducers/userReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const newBlogTitle = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogurl = useField('text')
  const username = useField('text')
  const password = useField('text')

  useEffect(() => {
    props.initializeBlogs()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const sortFunction = (a,b) => {
    if (a.likes === b.likes) {
      return 0
    } else {
      return(a.likes > b.likes) ? -1 : 1
    }
  }
  const user = props.user
  const blogs = props.blogs
  blogs.sort(sortFunction)
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password, })
      console.log(user.username,user.name)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setUser(user.username,user.name)
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
      props.createBlog(blogObject)
      props.setNotification(`a new blog: ${blogObject.title} by ${blogObject.author} added` , 5)

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

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        {user.name} logged in <br/><br/>
        <button type="logout" onClick={(() => {
          window.localStorage.removeItem('loggedBlogappUser')
          props.delUser()
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
      {(props.user === null && loginForm())}
      {(props.user !== null && blogForm())}
    </div>
  )

}
const MapStateToProps = (state) => {
  return {
    blogs:state.blogs,
    notification:state.notification,
    user:state.user
  }
}

const MapDispatchToProps = { setNotification, createBlog, initializeBlogs, setUser, delUser, incrementLikes }
const ConnectedApp = connect(MapStateToProps, MapDispatchToProps)(App)
export default ConnectedApp