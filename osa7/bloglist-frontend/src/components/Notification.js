import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const successStyle = { ...style, borderColor: 'green' }
  const errorStyle = { ...style, borderColor: 'red' }

  if(!props.notification) {
    return (
      <>
      </>
    )
  } else {
    return (
      <div style={props.notification.style==='error' ? errorStyle:successStyle}>
        {props.notification.message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)