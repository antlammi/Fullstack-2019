import React from 'react'
import TogglableBlog from './TogglableBlog'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  let label = blog.title + ', ' + blog.author
  return (

    <div className ="blog" style={blogStyle}>
      <TogglableBlog buttonLabel={label}>
        {blog.title}<br/>
        {blog.author}<br/>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <button>like</button><br/>
        Blog added by {blog.user.username}<br/>
      </TogglableBlog>
    </div>
  )
}

export default Blog