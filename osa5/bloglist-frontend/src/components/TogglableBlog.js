import React, { useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div onClick={toggleVisibility}>{props.buttonLabel}</div>
      </div>
      <div style={showWhenVisible} className="togglableContent" onClick={toggleVisibility}>
        {props.children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable