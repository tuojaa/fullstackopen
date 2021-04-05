import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const anecdotes = useSelector(state => {
    return state.blogs
  })

  return (
    <div>
      {anecdotes.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default BlogList