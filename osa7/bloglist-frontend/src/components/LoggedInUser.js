import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import {
  Button,
  Grid,
  Avatar,
  Typography
} from '@material-ui/core'

const LoggedInUser = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
  }

  if(!user) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
              Not logged in!
          </Typography>
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={1}>
        <Avatar>{user.name[0]}</Avatar>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h6" gutterBottom>
          Logged in as {user.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={handleLogout}>Logout</Button>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(LoggedInUser)