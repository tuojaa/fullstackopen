import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import {
  Button,
  Avatar
} from '@material-ui/core'

const LoggedInUser = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
  }

  if(!user) {
    return (
      <></>
    )
  }
  return (
    <div>
      <Button color="inherit"><Avatar>{user.name[0]}</Avatar>&nbsp;Logged in as {user.name}</Button>
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(LoggedInUser)