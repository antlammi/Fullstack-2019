const initialState = { message:'program started up successfully'}

export const newNotification = message => {
    return {
        type: 'SET_NOTIFICATION',
        message
    }
}

export const removeNotification = () => {
    return {
        type: 'DEL_NOTIFICATION'
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type){
        case 'SET_NOTIFICATION':
            state = {...state, message: action.message }
            return state
        case 'DEL_NOTIFICATION':
            state = { ...state, message: ''}
            return state
        default:
            return state
    }
}

export default notificationReducer