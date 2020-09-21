import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await handleLogin({ email, password })

    if (success) {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} id='loginForm'>
        <label htmlFor='loginEmail'>Email: </label>
        <input
          id='loginEmail'
          type='text'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <label htmlFor='loginPassword'>Password: </label>
        <input
          id='loginPassword'
          type='password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button type='submit' id='login'>
          login
        </button>
      </form>
    </FormWrapper>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
