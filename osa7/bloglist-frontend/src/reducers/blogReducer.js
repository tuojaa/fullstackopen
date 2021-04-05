import blogService from '../services/blogs'

const initialState = []

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.updateBlog( { ...blog, likes: blog.likes + 1 } )
    dispatch({
      type: 'UPDATE_BLOG',
      blog: { ...blog, likes: blog.likes + 1 }
    })
  }
}

const sortBlogs = (blogs) => {
  let result = [ ...blogs ]
  result.sort( (a,b) => (b.likes - a.likes))
  return result
}

export const addBlog = (title, author, url) => {
  return async dispatch => {
    const result = await blogService.createBlog({ title, author, url })
    dispatch({
      type: 'UPDATE_BLOG',
      blog: result.data
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
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