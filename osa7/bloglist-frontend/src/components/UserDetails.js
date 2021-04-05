import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import BlogList from './BlogList'

const UserDetails = ({ userList }) => {
  const id = useParams().id
  const user = userList.find(user => user.id===id)
  if(!user) {
    return (<></>)
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <BlogList blogs={user.blogs} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
  }
}

export default connect(mapStateToProps)(UserDetails)