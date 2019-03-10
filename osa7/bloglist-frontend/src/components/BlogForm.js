import React from 'react'
import { Form, Button } from 'semantic-ui-react'

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
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>title</label>
          <input
            {...newtitle}
          />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input
            {...newauthor}
          />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input
            {...newurl}
          />
        </Form.Field>
        <Button type="submit"> create </Button>
      </Form>

    </div>
  )
}

export default BlogForm