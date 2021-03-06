import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const clearToken = () => {
  token = undefined
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addComment = (blog_id, comment) => {
  return axios.post(`${baseUrl}/${blog_id}/comments`, { comment })
}

const createBlog = newBlog => {
  if(!token) throw new Error('Not authorized!')
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newBlog, config)
}

const updateBlog = ({ id, title, author, url, likes, user }) => {
  if(!token) throw new Error('Not authorized!')
  const config = {
    headers: { Authorization: token }
  }
  const newBlog = {
    title, author, url, likes, user: user?user.id:null
  }
  return axios.put(`${baseUrl}/${id}`, newBlog, config)
}

const deleteBlog = (id) => {
  if(!token) throw new Error('Not authorized!')
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

const blogService = {
  getAll,
  setToken,
  clearToken,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment
}

export default blogService