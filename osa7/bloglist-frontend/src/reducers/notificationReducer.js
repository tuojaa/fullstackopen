const initialState = null

export const setNotification = (status, message) => {
  return {
    type: 'SET_NOTIFICATION',
    message,
    status
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

var notificationTimerHandle = undefined

export const notify = (status, message) => {
  return async dispatch => {
    dispatch(setNotification(status, message))
    if(notificationTimerHandle)
      clearTimeout(notificationTimerHandle)
    notificationTimerHandle = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('notificationReducer: ', state, action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.message, status: action.status }
  case 'CLEAR_NOTIFICATION':
    return initialState
  default: return state
  }
}

export default notificationReducer