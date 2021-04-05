import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const AddBlog = () => {
  const dispatch = useDispatch()
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handle submit', title, author, url)
    dispatch(addBlog(title,author,url))
    setAuthor('')
    setTitle('')
    setUrl('')
    dispatch(notify('success', `New blog ${title} by ${author} added!`))
  }

  return (
    <div>
      <h2>Add new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
            title
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle( target.value )}
          />
        </div>
        <div>
            author
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor( target.value )}
          />
        </div>
        <div>
            url
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl( target.value )}
          />
        </div>
        <button
          id="submit"
          type="submit">add</button>
      </form>
    </div>
  )
}

export default AddBlog