import React from 'react'

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

export default LoggedInUser