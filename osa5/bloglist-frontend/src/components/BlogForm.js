import React from 'react'

const BlogForm = ({
  title,
  author,
  url,
  handleSubmit,
}) => {
  delete title.reset
  delete author.reset
  delete url.reset
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title
          <input
            {...title}
          />
        </div>
        <div>
            author
          <input
            {...author}
          />
        </div>
        <div>
            url
          <input
            {...url}
          />
        </div>
        <button type="submit"> create </button>
      </form>

    </div>
  )
}

export default BlogForm