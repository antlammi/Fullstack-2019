const initialState = { message:'program started up successfully'}
export const removeNotification = () => {
    return {
        type: 'DEL_NOTIFICATION'
    }
}
export const newNotification = ({message}) => {
    //Saatan palata vielä tekemään asynkronisen action creatorin, mutta sovelluksen nykyinen tila ei
    //varsinaisesti vastaa tehtävänantoa suoraan, sillä notifikaation poisto on eristetty osaksi Notification
    //luokkaa. Käytännössä muille komponenteille käyttötapa on jo tehtävänannon ratkaisua vastaava.
    return {
        type: 'SET_NOTIFICATION',
        message
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