import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN) 

  if (!props.show) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await login({ variables: { username, password }})
      const token = result.data.login.value
      console.log("got token: ", token)    
      props.doLogin(token)  
      window.localStorage.setItem('library-user-token', token)
    } catch(error) {
      alert(`Login failed: ${error}`)
      return
    }
    
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: 
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password: 
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login