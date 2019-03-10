import React from 'react'

const BlogForm = ({
  title,
  author,
  url,
  handleSubmit,
}) => {
  const newtitle = { ...title }
  const newauthor = { ...author }
  const newurl = { ...url }

  delete newtitle.reset
  delete newauthor.reset
  delete newurl.reset
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title
          <input
            {...newtitle}
          />
        </div>
        <div>
            author
          <input
            {...newauthor}
          />
        </div>
        <div>
            url
          <input
            {...newurl}
          />
        </div>
        <button type="submit"> create </button>
      </form>

    </div>
  )
}

export default BlogForm