import React from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  Typography
} from '@material-ui/core'

const Notification = (props) => {

  if(!props.notification) {
    return (
      <>
      </>
    )
  } else {
    return (
      <Paper variant="outlined" square>
        <Typography variant="h6">
          {props.notification.message}
        </Typography>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)