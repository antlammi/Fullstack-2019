import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  notificationMessage,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notificationMessage}/>
      <form onSubmit={handleSubmit}>
        <div>
              käyttäjätunnus
          <input
            {...username}
          />
        </div>
        <div>
              salasana
          <input
            {...password}
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