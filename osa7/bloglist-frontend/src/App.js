import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import LoggedInUser from './components/LoggedInUser'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { loginUserFromDS } from './reducers/userReducer'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loginUserFromDS())
  }, [])


  if (props.user===null) {
    return (
      <div>
        <Notification />
        <LoggedInUser />
        <LoginForm/>
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <LoggedInUser />
        <h2>blogs</h2>
        <BlogList />
        <Togglable buttonLabel='Add new blog'>
          <AddBlog />
        </Togglable>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App)

