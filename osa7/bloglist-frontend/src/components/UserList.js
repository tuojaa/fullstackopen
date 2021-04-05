import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserListRow = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )
}

const UserList = ({ userList }) => {
  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user =>
            <UserListRow
              key={user.id}
              user={user}
            />)}
        </tbody>
      </table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    userList: state.userList,
  }
}

export default connect(mapStateToProps)(UserList)