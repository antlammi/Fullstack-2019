import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const Bloglist = (props) => {
  console.log(props.blogs)
  return(
    <div>
      <Table striped celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>Author</Table.Cell>
            <Table.Cell>Likes</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
              <Table.Cell>{blog.author}</Table.Cell>
              <Table.Cell>{blog.likes}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Bloglist
//{blogs.map(blog => <Blog key={blog.id} current_user={user} blog={blog} />)}
