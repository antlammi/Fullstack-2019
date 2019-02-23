import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogurl, setNewBlogurl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout((() => {setNotificationMessage(null)}), 5000)
    }

    
  }
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogurl
    }
    try{
      if (await blogService.create(blogObject)){
        setBlogs(blogs.concat(blogObject))
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
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                /> 
          </div>
          <div>
            salasana
              <input
                type="password"
                value={password}
                name="Password"
                onChange = {({target}) => setPassword(target.value)}
                />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
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
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
        <div>
          title
          <input 
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({target}) => setNewBlogTitle(target.value)}
            />
        </div>
        <div>
          author
          <input 
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({target}) => setNewBlogAuthor(target.value)}
            />
        </div>
        <div>
          url
          <input 
            type="url"
            value={newBlogurl}
            name="url"
            onChange={({target}) => setNewBlogurl(target.value)}
            />
        </div>
        <button type="submit"> create </button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
       
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