

export const removeNotification = () => {
  return {
    type:'DEL_NOTIFICATION',
  }
}

export const setNotification = (message, timeout, success) => {
  console.log('message: ', message)
  console.log('timeout: ', timeout )
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      message,
      success
    })
    setTimeout(() => dispatch(removeNotification(timeout)), 1000*timeout)
  }
}

const notificationReducer =(state='', action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    state={ ...state, message:action.message, success:action.success }
    return state
  case 'DEL_NOTIFICATION':
    state={ ...state, message:'' }
    return state
  default:
    return state
  }
}
export default notificationReducer