import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import LoggedInUser from './components/LoggedInUser'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)

  const notify = (type, text) => {
    setNotification({ type, text })
    setTimeout(() => {
      setNotification(null)
    }, 5000)    
  }

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const doAddBlog = (event) => {
    event.preventDefault()
    blogService.createBlog({ title, author, url })
      .then(result => {
        const newBlogs = [ ...blogs, result.data ]
        setBlogs(newBlogs)
        setTitle('')
        setAuthor('')
        setUrl('')
        notify('success', 'Blog added!')
      })
      .catch(error => {
        notify('error', `Failed to add blog: ${error}`)
      })
  }

  const ls_key = 'dsloggedBloglistUser'
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const doLogin = (event) => {
    event.preventDefault()
    loginService.login(username, password)
      .then(result => {
        const user = {
          username: result.username,
          name: result.name,
          token: result.token
        }
        setUser(user)
        setUsername('')
        setPassword('')
        window.localStorage.setItem(ls_key, JSON.stringify(user))
        blogService.setToken(user.token)
        notify('success', 'Logged in!')
      })
      .catch(error => {        
        if (error.response && error.response.status === 401) {
          notify('error', 'Incorrect password!')
          return
        }
        notify('error', `Unknown error when logging in: ${error}`)
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(ls_key)
    if (loggedUserJSON) {            
      const user = JSON.parse(loggedUserJSON)            
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const [blogs, _setBlogs] = useState([])

  const setBlogs = (blogs) => {
    blogs.sort( (a,b) => (b.likes - a.likes))
    _setBlogs(blogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs)
      setBlogs( blogs )
    })  
  }, [])

  const doLogout = () => {
    window.localStorage.removeItem(ls_key)
    setUser(null)
    notify('success', 'Logged out!')
  }

  const addLike = (id) => {
    const newBlogs = [ ...blogs ]
    const blog = newBlogs.find(blog => (blog.id.toString()===id))
    
    blog.likes = blog.likes + 1
    blogService.updateBlog( blog )
      .then(result => { setBlogs(newBlogs) })    
  }

  const removeBlog = (id) => {
    const newBlogs = blogs.filter((blog) => (blog.id.toString() !== id))
    blogService.deleteBlog( id )
      .then(result => { setBlogs(newBlogs) })
  }

  if (user===null) {
    return (
      <div>
        <Notification message={notification} />
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={doLogin} 
        />
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={notification} />
        <LoggedInUser name={user.name} handleLogout={doLogout}/>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            handleLike={() => addLike(blog.id)} 
            handleRemove={() => removeBlog(blog.id)} 
            />
        )}
        <Togglable buttonLabel='Add new blog'>
          <AddBlog
            title={title}
            url={url}
            author={author}
            handleTitleChange={({ target }) =>  setTitle(target.value)}
            handleUrlChange={({ target }) =>  setUrl(target.value)}
            handleAuthorChange={({ target }) =>  setAuthor(target.value)}
            handleSubmit={doAddBlog}
          />
        </Togglable>
      </div>
    )  
  }
}

export default App