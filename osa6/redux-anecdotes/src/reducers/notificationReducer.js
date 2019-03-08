
const initialState = { message:'program started up successfully'}
export const removeNotification = (timeout) => {
    return {
        type: 'DEL_NOTIFICATION',
            
    }
}

export const setNotification = (message, timeout) => {
    return async dispatch => {
        //Saatan palata vielä tekemään asynkronisen action creatorin, mutta sovelluksen nykyinen tila ei
        //varsinaisesti vastaa tehtävänantoa suoraan, sillä notifikaation poisto on eristetty osaksi Notification
        //luokkaa. Käytännössä muille komponenteille käyttötapa on jo tehtävänannon ratkaisua vastaava.
        await dispatch ({
        type: 'SET_NOTIFICATION',
        message
        })
        setTimeout(() => dispatch(removeNotification(timeout)), 1000*timeout)
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
            console.log('del noti reached')
            state = { ...state, message: ''} 
            
            return state
        default:
            return state
    }
}

export default notificationReducer