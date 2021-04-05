import React from 'react'
import PropTypes from 'prop-types'

const LoggedInUser = ({
  name,
  handleLogout
}) => {
  return (
    <div>
      Logged in as {name} <button onClick={handleLogout}>logout</button>
    </div>
  )
}

LoggedInUser.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LoggedInUser