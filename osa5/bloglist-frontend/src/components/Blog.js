import React, { useState } from 'react'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [ details, setDetails ] = useState(false)
  
  const handleShow = () => {
    setDetails(true)
  }

  const handleHide = () => {
    setDetails(false)
  }


  if (details) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setDetails(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} likes 
        </div>
        <div>
          Added by {blog.user && blog.user.name}
        </div>
      </div>  
    )
  } else {
    return (  
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={handleShow}>show</button>
        </div>        
      </div>  
    )  
  }
  
 
}

export default Blog