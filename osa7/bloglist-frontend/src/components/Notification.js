import React from 'react'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification.message === ''){
    return <div></div>
  }
  return (
    <div className ="notification">
      {props.notification.message}
    </div>
  )
}
const MapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const MapDispatchToProps = { setNotification, removeNotification }
const ConnectedNotification = connect(MapStateToProps, MapDispatchToProps)(Notification)
export default ConnectedNotification