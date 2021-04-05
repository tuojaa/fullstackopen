import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h2">Blogs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogList)
