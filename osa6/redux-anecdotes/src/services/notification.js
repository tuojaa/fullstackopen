import { setNotification, clearNotification } from '../reducers/notificationReducer'

export const notify = (message, seconds) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => dispatch(clearNotification()), seconds*1000)    
    }
}