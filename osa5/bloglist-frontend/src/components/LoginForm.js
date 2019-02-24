import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
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
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
              salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange = {handlePasswordChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm