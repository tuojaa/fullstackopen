import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import LoggedInUser from './components/LoggedInUser'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import { useDispatch, connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { loginUserFromDS } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { initUserList } from './reducers/userListReducer'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loginUserFromDS())
  }, [])

  useEffect(() => {
    dispatch(initUserList())
  }, [])


  return (
    <div>
      <Notification />
      <LoggedInUser />
      { (props.user===null) ? (
        <LoginForm/>
      ) : (
        <div>
          <Router>
            <Switch>
              <Route path="/users/:id">
                <UserDetails />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/">
                <BlogList />
                <Togglable buttonLabel='Add new blog'>
                  <AddBlog />
                </Togglable>
              </Route>
            </Switch>
          </Router>
        </div>
      )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App)

