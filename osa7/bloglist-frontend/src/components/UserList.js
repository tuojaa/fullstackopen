import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'

const UserListRow = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </TableCell>
      <TableCell>
        {user.blogs.length}
      </TableCell>
    </TableRow>
  )
}

const UserList = ({ userList }) => {
  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell></TableCell>
            <TableCell>Blogs created</TableCell>
          </TableHead>
          <TableBody>
            {userList.map(user =>
              <UserListRow
                key={user.id}
                user={user}
              />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    userList: state.userList,
  }
}

export default connect(mapStateToProps)(UserList)