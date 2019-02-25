import React from 'react'
import TogglableBlog from './TogglableBlog'
import BlogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    
    await BlogService.put(blog)
    window.location.reload()

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
      </TogglableBlog>
    </div>
  )
}

export default Blog