import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [ details, setDetails ] = useState(false)
  
  if (details) {
    return (
      <div style={blogStyle}>
        <div>
          <strong>{blog.title}</strong> by <strong>{blog.author}</strong> <button onClick={() => setDetails(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </div>
        <div>
          Added by {blog.user && blog.user.name}
        </div>
        <button onClick={handleRemove}>remove</button>
      </div>  
    )
  } else {
    return (  
      <div style={blogStyle}>
        <div className="blogSummary">
          <strong>{blog.title}</strong> by <strong>{blog.author}</strong> <button className="showblog" onClick={() => setDetails(true)}>show</button>
        </div>        
      </div>  
    )  
  } 
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog