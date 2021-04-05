import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import LoggedInUser from './components/LoggedInUser'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initBlogs())
  }, [dispatch])

  const ls_key = 'dsloggedBloglistUser'
  const [user, setUser] = useState(null)

  const doLogin = (username, password) => {
    return loginService.login(username, password)
      .then(result => {
        const user = {
          username: result.username,
          name: result.name,
          token: result.token
        }
        setUser(user)
        window.localStorage.setItem(ls_key, JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(notify('success', 'Logged in!'))
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch(notify('error', 'Incorrect password!'))
        } else {
          dispatch(notify('error', `Unknown error when logging in: ${error}`))
        }
        throw error
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(ls_key)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(notify('success', 'Logged in automatically!'))
    }
  }, [])

  const doLogout = () => {
    window.localStorage.removeItem(ls_key)
    setUser(null)
    dispatch(notify('success', 'Logged out!'))
  }

  if (user===null) {
    return (
      <div>
        <Notification />
        <LoginForm
          doLogin={doLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <LoggedInUser name={user.name} handleLogout={doLogout}/>
        <h2>blogs</h2>
        <BlogList />
        <Togglable buttonLabel='Add new blog'>
          <AddBlog />
        </Togglable>
      </div>
    )
  }
}

export default App