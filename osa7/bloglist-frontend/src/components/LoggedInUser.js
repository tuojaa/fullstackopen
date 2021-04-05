import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoggedInUser = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
  }

  if(!user) {
    return (
      <div>Not logged in!</div>
    )
  }
  return (
    <div>
      Logged in as {user.name} <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(LoggedInUser)