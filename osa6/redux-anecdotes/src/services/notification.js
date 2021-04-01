import { setNotification, clearNotification } from '../reducers/notificationReducer'

var notificationTimeout = undefined

export const notify = (message, seconds) => {
    return async dispatch => {
        dispatch(setNotification(message))
        if(notificationTimeout)
            clearTimeout(notificationTimeout)
        notificationTimeout = setTimeout(() => dispatch(clearNotification()), seconds*1000)    
    }
}