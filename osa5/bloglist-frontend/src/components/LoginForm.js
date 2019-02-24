import React from 'react'
import Notification from './Notification'
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
export default LoginForm