import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const initialState = []

export const initBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        blogs
      })
    } catch(error) {
      dispatch(notify('error', `Failed to fetch blogs: ${error}`))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.updateBlog( { ...blog, likes: blog.likes + 1 } )
      dispatch({
        type: 'UPDATE_BLOG',
        blog: { ...blog, likes: blog.likes + 1 }
      })
      dispatch(notify('success', 'Blog liked!'))
    } catch(error) {
      dispatch(notify('error', `Failed to like a blog: ${error}`))
    }
  }
}

const sortBlogs = (blogs) => {
  let result = [ ...blogs ]
  result.sort( (a,b) => (b.likes - a.likes))
  return result
}

export const addBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const result = await blogService.createBlog({ title, author, url })
      dispatch({
        type: 'UPDATE_BLOG',
        blog: result.data
      })
      dispatch(notify('success', 'Blog added!'))
    } catch(error) {
      dispatch(notify('error', `Failed to add a blog: ${error}`))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const result = await blogService.addComment(blog.id, comment)
      blog.comments.push({ id: result.id, comment })
      dispatch({
        type: 'UPDATE_BLOG',
        blog: blog
      })
      dispatch(notify('success', 'Added comment!'))
    } catch(error) {
      dispatch(notify('error', `Failed to add comment: ${error}`))
    }
  }
}


export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch({
        type: 'REMOVE_BLOG',
        id: blog.id
      })
      dispatch(notify('success', 'Blog removed!'))
    } catch(error) {
      dispatch(notify('error', `Failed to remove a blog: ${error}`))
    }
  }
}

const blogReducer = (state = initialState, action) => {
  switch( action.type ) {
  case 'INIT_BLOGS':
    return sortBlogs(action.blogs)
  case 'UPDATE_BLOG': {
    const newBlogs = [ ...state.filter( blog => (blog.id !== action.blog.id)), action.blog ]
    return sortBlogs(newBlogs)
  }
  case 'REMOVE_BLOG': {
    const newBlogs = [ ...state.filter( blog => (blog.id !== action.id)) ]
    return sortBlogs(newBlogs)
  }
  default:
    return state
  }
}

export default blogReducer