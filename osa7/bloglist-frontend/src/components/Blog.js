import React from 'react'
import TogglableBlog from './TogglableBlog'
import BlogService from '../services/blogs'
import { incrementLikes } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
const Blog = (props) => {
  const blog = props.blog
  const current_user = props.current_user
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    props.setNotification('You liked blog ' + blog.title, 5)
    props.incrementLikes(props.blog)
  }

  const handleRemove = async () => {
    if (window.confirm('Remove blog ' + blog.title + ' by ' +blog.author +'?')) {
      try {
        await BlogService.remove(blog.id)
        window.location.reload()
        console.log('Blog deleted succesfully')
      } catch(error){
        console.log('Error while attempting to delete blog')
      }
    }

  }
  const DeleteButton= () => {
    if (current_user.username === blog.user.username){
      return (
        <div><button onClick={handleRemove}>remove</button></div>
      )} else {
      return (<div></div>)
    }
  }
  let label = blog.title + ', ' + blog.author
  return (

    <div className ="blog" style={blogStyle}>
      <TogglableBlog buttonLabel={label}>
        {blog.title}<br/>
        {blog.author}<br/>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <button onClick={handleLike}>like</button><br/>
        Blog added by {blog.user.username}<br/>
        <DeleteButton/>
      </TogglableBlog>
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