import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import DeleteIcon from '@material-ui/icons/Delete'

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
      <Typography variant="h2">Add new comment</Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="comment"
            value={comment}
            onChange={({ target }) => setComment( target.value )}
          />
        </div>
        <Button
          id="submit" type="submit">Add</Button>
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

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    dispatch(removeBlog(blog))
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>{blog.title}</strong> by <strong>{blog.author}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a href={blog.url}>{blog.url}</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {blog.likes} likes
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ThumbUpIcon />}
                  onClick={handleLike}
                >Like</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Added by {blog.user && blog.user.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRemove}
                  startIcon={<DeleteIcon />}
                >Remove</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AddComment blog={blog} />
      <List>
        {blog.comments.map(comment =>
          <ListItem key={comment.id}>
            <ListItemText>
              {comment.comment}
            </ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogDetails)

