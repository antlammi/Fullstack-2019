import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  const username_submit = { ...username }
  const password_submit = { ...password }
  delete username_submit.reset
  delete password_submit.reset
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>käyttäjätunnus</label>
          <input
            {...username_submit}
          />
        </Form.Field>
       
        <Form.Field>
          <label>salasana</label>
          <input
            {...password_submit}
          />
        </Form.Field>
        <Button type="submit">kirjaudu</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
export default LoginForm