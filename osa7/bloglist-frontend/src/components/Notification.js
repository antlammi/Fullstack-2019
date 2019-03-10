import React from 'react'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
const Notification = (props) => {
  if (props.notification.message === ''){
    return <div></div>
  }
  if (props.notification.success){
    return (
      <Message success>
        {props.notification.message}
      </Message>
    )
  } else {
    return <Message negative>{props.notification.message}</Message>
  }
}
const MapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const MapDispatchToProps = { setNotification, removeNotification }
const ConnectedNotification = connect(MapStateToProps, MapDispatchToProps)(Notification)
export default ConnectedNotification