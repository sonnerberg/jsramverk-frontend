import React, { useState } from 'react'
import { postData } from '../services/fetchHelpers'
import FormWrapper from './FormWrapper'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const data = await postData('http://localhost:3333/login', {
      email,
      password,
    })

    if (data.data?.token) {
      localStorage.setItem(
        'jsramverk-sonnerberg',
        JSON.stringify({ token: data?.data?.token }),
      )
      setEmail('')
      setPassword('')
      // close login
    }

    setResponse(data.errors ? data.errors : data)

    setTimeout(() => {
      setResponse('')
    }, 5000)

    // set the user to { email: response.data.email, token: response.data.token }
    // attach the token to all requests that need a token
  }

  return (
    <FormWrapper>
      <form onSubmit={handleLogin}>
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
        <button type='submit'>login</button>
      </form>
      {response ? (
        <div>
          {response.title && response.title + ': '}
          {response.detail && response.detail}
        </div>
      ) : null}
    </FormWrapper>
  )
}

export default LoginForm
