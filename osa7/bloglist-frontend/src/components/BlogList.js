import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div>
      <strong>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </strong> by <strong>{blog.author}</strong>
    </div>
  )
}

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogList)
