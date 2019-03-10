import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data:blogs
    })
  }
}

export const createBlog = data => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type:'NEW_BLOG',
      data:newBlog
    })
  }
}

export const incrementLikes = (blog) => {
  return async dispatch => {
    await blogService.put(blog)
    dispatch({
      type: 'LIKE',
      id: blog.id
    })
  }
}
export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type:'DELETE',
      data: { id }
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type){
  case'NEW_BLOG': {
    return state.concat(action.data)
  }
  case'LIKE': {
    console.log(state)
    const id = action.id
    const blogToChange = state.find(n => n.id === action.id)
    console.log(blogToChange)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes +1 }
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  }
  case'DELETE':
    return state.map(blog => blog.id !== action.data.id ? blog: null)
  case'INIT_BLOGS':
    return action.data
  default: {
    return state
  }
  }
}

export default blogReducer