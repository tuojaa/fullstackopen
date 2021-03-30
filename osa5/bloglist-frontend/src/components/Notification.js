import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (!message) {
      return (
        <></>
      )
    }
    return (
      <div className={"notification "+message.type}>{message.text}</div>
    )
  }
  
Notification.propTypes = {
    message: PropTypes.object.isRequired
}

export default Notification