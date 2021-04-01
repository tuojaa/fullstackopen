const initialState = null    

export const setNotification = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        message: message
    }
}

export const clearNotification = (message) => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}


const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':    
            return action.message        
        case 'CLEAR_NOTIFICATION':
            return initialState
        default: return state
      }          
}
    
export default notificationReducer