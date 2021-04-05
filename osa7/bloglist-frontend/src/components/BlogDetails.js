import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

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
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Add a comment..."
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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
})

const CommentList = ({ comments }) => {
  const classes = useStyles()
  if(comments.length === 0) {
    return (
      <Typography className={classes.pos} color="textSecondary">
          No comments yet!
      </Typography>
    )
  }
  return (
    <List>
      {comments.map(comment =>
        <ListItem key={comment.id}>
          <ListItemText>
            {comment.comment}
          </ListItemText>
        </ListItem>
      )}
    </List>
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
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <a href={blog.url}>{blog.title}</a>
        </Typography>
        <Typography>
          by <strong>{blog.author}</strong>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {blog.likes} likes
        </Typography>
        <CommentList comments={blog.comments} />
        <AddComment blog={blog} />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ThumbUpIcon />}
          onClick={handleLike}
        >Like</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemove}
          startIcon={<DeleteIcon />}
        >Remove</Button>
      </CardActions>
    </Card>
  )
/*
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
*/
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogDetails)

