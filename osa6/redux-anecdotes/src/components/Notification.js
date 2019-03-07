import React from 'react';
import { newNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props)=> {
  
 
  if (props.notification.message !== ''){
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    
    
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
    console.log(props.notification.message)
   
  
    return (
      <div style={style}>
        {props.notification.message}
      </div>
    )
    
  } else return (<div></div>)
}
const MapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const MapDispatchToProps = { newNotification, removeNotification }
const ConnectedNotification = connect(MapStateToProps, MapDispatchToProps)(Notification)
export default ConnectedNotification
