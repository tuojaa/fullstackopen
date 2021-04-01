import { setNotification, clearNotification } from '../reducers/notificationReducer'

export const notify = (dispatch, message) => {
   
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), 5000)
}