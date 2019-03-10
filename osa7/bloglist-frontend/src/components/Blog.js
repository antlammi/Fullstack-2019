import React from 'react'
import { incrementLikes } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
const Blog = (props) => {
  const blog = props.blog
  if (blog === undefined){
    return (
      <div>
        <Router>
          <Redirect to="/blogs"/>
        </Router>
      </div>
    )
  }

  const current_user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const handleLike = () => {
    props.setNotification('You liked blog ' + blog.title, 5, true)
    props.incrementLikes(blog)
  }

  const handleRemove = () => {
    if (window.confirm('Remove blog ' +blog.title + ' by ' +blog.author +'?')) {
      try {
        props.removeBlog()
        props.history.push('/')
        console.log('Blog deleted succesfully')
      } catch(error){
        console.log('Error while attempting to delete blog')
      }
    }

  }
  const DeleteButtonRedirect= () => {
    if (current_user.username === blog.user.username){
      return (
        <div><Button primary onClick={handleRemove}>remove</Button></div>
      )} else {
      return (<div></div>)
    }
  }
  const DeleteButton =withRouter(DeleteButtonRedirect)
  const paragraphStyle = {
    fontSize:20
    
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div style={paragraphStyle}>
        Author: {blog.author}<br/><br/>
        URL:  <a href={blog.url}>{blog.url}</a><br/><br/>
        {blog.likes} likes <button className="ui compact small button" onClick={handleLike}>like</button><br/><br/>
        added by {blog.user.username}<br/><br/>
        <DeleteButton/>
      </div>
    </div>
  )
}
const MapStateToProps = (state) => {
  return{
    blogs:state.blogs,
    notification:state.notification
  }
}
const MapDispatchToProps = { setNotification, incrementLikes }
const ConnectedBlog = connect(MapStateToProps, MapDispatchToProps)(Blog)
export default ConnectedBlog