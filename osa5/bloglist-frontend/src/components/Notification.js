import React from 'react'

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
  
export default Notification