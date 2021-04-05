import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import {
  TextField,
  Button,
  Typography
} from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Typography variant="h2">
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value) }
          />
        </div>
        <br/>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm