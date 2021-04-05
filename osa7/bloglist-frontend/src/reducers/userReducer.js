import { notify } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null
const ls_key = 'dsloggedBloglistUser'

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const clearUser = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_USER'
    })
    dispatch(notify('success', 'Logged out!'))
    window.localStorage.removeItem(ls_key)
  }
}

export const loginUserFromDS = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem(ls_key)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        user
      })
      dispatch(notify('success', 'Logged in automatically!'))
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const result = await loginService.login(username, password)
      const user = {
        username: result.username,
        name: result.name,
        token: result.token
      }
      dispatch(setUser(user))
      window.localStorage.setItem(ls_key, JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(notify('success', 'Logged in!'))

    } catch(error) {
      if (error.response && error.response.status === 401) {
        dispatch(notify('error', 'Incorrect password!'))
      } else {
        dispatch(notify('error', `Unknown error when logging in: ${error}`))
      }
    }
  }
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER': {
    blogService.setToken(action.user.token)
    return action.user
  }
  case 'CLEAR_USER': {
    blogService.clearToken()
    return initialState
  }
  default:
    return state
  }
}

export default userReducer