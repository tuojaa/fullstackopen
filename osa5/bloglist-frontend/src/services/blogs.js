import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newBlog, config)
}

const updateBlog = ({ id, title, author, url, likes, user }) => {
  const config = {
    headers: { Authorization: token }
  }
  const newBlog = {
    title, author, url, likes, user: user?user.id:null
  }
  return axios.put(`${baseUrl}/${id}`, newBlog, config)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

const blogService = { 
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog
}

export default blogService