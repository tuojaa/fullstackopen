import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import {
  TextField,
  Button,
  Typography,
  FormControl,
  Grid
} from '@material-ui/core'

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
      <Typography variant="h2">
        Add new blog
      </Typography>

      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              id="title"
              value={title}
              onChange={({ target }) => setTitle( target.value )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              id="author"
              value={author}
              onChange={({ target }) => setAuthor( target.value )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="url"
              label="URL"
              value={url}
              onChange={({ target }) => setUrl( target.value )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained" color="primary"
              id="submit"
              type="submit">Add</Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  )
}

export default AddBlog