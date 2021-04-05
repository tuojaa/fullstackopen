import React from 'react'
import { connect } from 'react-redux'
import {
  Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const Notification = (props) => {

  if(!props.notification) {
    return (
      <>
      </>
    )
  } else {
    const component = (
      <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity={props.notification.status}>{props.notification.message}</Alert>
      </Snackbar>
    )
    return component
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)