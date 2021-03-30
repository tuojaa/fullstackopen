import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
   doLogin,
  }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = (event) => {
        event.preventDefault()
        doLogin(username, password)
            .then(() => {
                setUsername('')
                setPassword('')    
            })
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                username
                <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value) }
                />
            </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    doLogin: PropTypes.func.isRequired,
}

export default LoginForm