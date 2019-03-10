const initialState = { message: 'program started up succesfully' }
export const removeNotification = () => {
  return {
    type:'DEL_NOTIFICATION',
  }
}

export const setNotification = (message, timeout) => {
  console.log('message: ', message)
  console.log('timeout: ', timeout )
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => dispatch(removeNotification(timeout)), 1000*timeout)
  }
}

const notificationReducer =(state=initialState, action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    state={ ...state, message:action.message }
    return state
  case 'DEL_NOTIFICATION':
    state={ ...state, message:'' }
    return state
  default:
    return state
  }
}
export default notificationReducer