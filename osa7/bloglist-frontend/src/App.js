import React, { useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import useField from './hooks/index'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, incrementLikes, initializeBlogs } from './reducers/blogReducer'
import { setUser, delUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import { Button, Menu, Container } from 'semantic-ui-react'
import Bloglist from './components/Bloglist'
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'
const App = (props) => {
  const newBlogTitle = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogurl = useField('text')
  const username = useField('text')
  const password = useField('text')

  useEffect(() => {
    props.initializeBlogs()
    props.setNotification('program started up succesfully', 5, true)
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
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setUser(user)
      username.reset()
      password.reset()
      props.setNotification('Login successful', 5, true)
    } catch (exception) {
      username.reset()
      password.reset()
      props.setNotification('käyttäjätunnus tai salasana virheellinen',5, false)
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
      props.setNotification(`a new blog: ${blogObject.title} by ${blogObject.author} added` , 5, true)

    } catch (exception){
      props.setNotification('error creating blog', 5, false)
    }
  }
  const loginForm = () => {
    if (user){
      return(
        <div>
          {user.name} logged in <br/><br/>
          <Button type="logout" onClick={(() => {
            window.localStorage.removeItem('loggedBlogappUser')
            props.delUser()
            window.location.reload()
          })}>
            logout
          </Button>
        </div>
      )

    } else {
      return (
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      )
    }
  }

  const navMenu = () => {

    return (
      <div>
        <Router>
          <div>

            <Menu inverted >
              <Menu.Item link><Link to="/">{user ? user.username:'login'}</Link></Menu.Item>
              <Menu.Item link><Link to="/blogs">blogs</Link></Menu.Item>
              <Menu.Item link><Link to="/create">create new</Link></Menu.Item>
            </Menu>
            <Route exact path="/" render={() => loginForm()}/>
            <Route exact path="/blogs" render={() => user !== null && <Bloglist blogs={blogs}/>}/>
            <Route exact path="/create" render={() => user!== null && <BlogForm
              title={newBlogTitle} author={newBlogAuthor}
              url={newBlogurl} handleSubmit={handleNewBlog}/>}/>
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={blogs.find(a => a.id === match.params.id)}/>}/>
          </div>
        </Router>

      </div>
    )
  }

  return(
    <Container>
      <div>
        <Notification/>
        {navMenu()}
      </div>
    </Container>
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