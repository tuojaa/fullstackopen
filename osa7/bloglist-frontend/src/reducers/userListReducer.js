import { notify } from './notificationReducer'
import userListService from '../services/userList'

export const initUserList = () => {
  return async dispatch => {
    try {
      const userList = await userListService.getAll()
      dispatch({
        type: 'SET_USER_LIST',
        userList
      })
    } catch(error) {
      dispatch(notify('error', `Failed to fetch user list: ${error}`))
    }
  }
}

const initialState = []

const userListReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER_LIST':
    return action.userList
  default:
    return state
  }
}

export default userListReducer