const initialState = null    

export const setFilter = (value) => {
    return {
        type: 'SET_FILTER',
        filter: value
    }
}

export const clearNotification = (message) => {
    return {
        type: 'CLEAR_FILTER'
    }
}


const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':    
            return action.filter        
        case 'CLEAR_FILTER':
            return initialState
        default: return state
      }          
}
    
export default filterReducer