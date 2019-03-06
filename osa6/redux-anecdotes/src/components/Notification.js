import React from 'react';
import { newNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'
const Notification = ({store, message })=> {
  if (message !== '') {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (store.getState().notification.message !== message) { //oli ongelmia sisäkkäisten store dispatch kutsujen kanssa, pikainen spagettiratkaisu tähän
      store.dispatch(newNotification(message))
    }
    setTimeout(() => store.dispatch(removeNotification()), 5000)
    
    return (
      <div style={style}>
        {store.getState().notification.message}
      </div>
    )
  } else return <div></div>
}

export default Notification
