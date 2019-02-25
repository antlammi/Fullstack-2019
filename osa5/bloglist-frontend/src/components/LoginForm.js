import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  notificationMessage,
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
      <Notification message={notificationMessage}/>
      <form onSubmit={handleSubmit}>
        <div>
              käyttäjätunnus
          <input
            {...username_submit}
          />
        </div>
        <div>
              salasana
          <input
            {...password_submit}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
export default LoginForm