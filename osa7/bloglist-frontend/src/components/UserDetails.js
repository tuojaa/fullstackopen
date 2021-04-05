import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import BlogList from './BlogList'
import {
  Paper,
  Typography
} from '@material-ui/core'

const UserDetails = ({ userList }) => {
  const id = useParams().id
  const user = userList.find(user => user.id===id)
  if(!user) {
    return (<></>)
  }
  return (
    <Paper>
      <Typography variant="h2">{user.name}</Typography>
      <BlogList blogs={user.blogs} />
    </Paper>
  )
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
  }
}

export default connect(mapStateToProps)(UserDetails)