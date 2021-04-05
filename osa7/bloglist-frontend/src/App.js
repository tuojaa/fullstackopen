import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import Menu from './components/Menu'
import { useDispatch, connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { loginUserFromDS } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { initUserList } from './reducers/userListReducer'
import Container from '@material-ui/core/Container'

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
    <Container>
      <Notification />
      { (props.user===null) ? (
        <LoginForm/>
      ) : (
        <div>
          <Router>
            <Menu />
            <Switch>
              <Route path="/users/:id">
                <UserDetails />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/blogs/:id">
                <BlogDetails />
              </Route>
              <Route path="/">
                <BlogList />
                <br/>
                <Togglable buttonLabel='Add new blog'>
                  <AddBlog />
                </Togglable>
              </Route>
            </Switch>
          </Router>
        </div>
      )
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App)

