import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'

const AddComment = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(blog,comment))
    setComment('')
  }

  return (
    <div>
      <h2>Add comment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment( target.value )}
          />
        </div>
        <button
          id="submit"
          type="submit">add</button>
      </form>
    </div>
  )
}

const BlogDetails = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id===id)
  if(!blog) {
    return (<></>)
  }

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    dispatch(removeBlog(blog))
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> by <strong>{blog.author}</strong>
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
      <h2>comments</h2>
      <AddComment blog={blog} />
      {blog.comments.map(comment =>
        <li
          key={comment.id}
        >
          {comment.comment}
        </li>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogDetails)

