export const setUser = (user) => {
  console.log('help')
  return async dispatch => {
    console.log(user.username)
    console.log(user.name)
    await dispatch({
      type: 'SET_CURRENTUSER',
      username:user.username,
      name:user.name
    })
  }
}

export const delUser = () => {
  return async dispatch => {
    await dispatch({
      type:'NUL_CURRENTUSER'
    })
  }
}

export const userReducer =(state=null, action) => {
  switch(action.type){
  case 'SET_CURRENTUSER':
    state={ ...state, username:action.username, name:action.name }
    return state
  case 'NUL_CURRENTUSER':
    state={ ...state, user:null }
    return state
  default:
    return state
  }
}

export default userReducer