import { setNotification, clearNotification } from '../reducers/notificationReducer'

let notificationTimeout = undefined

export const notify = (message, seconds) => {
    return async dispatch => {
        dispatch(setNotification(message))
        if(notificationTimeout)
            clearTimeout(notificationTimeout)
        notificationTimeout = setTimeout(() => dispatch(clearNotification()), seconds*1000)    
    }
}