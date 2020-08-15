import React, { useState } from 'react'
import { postData } from '../services/fetchHelpers'
import FormWrapper from './FormWrapper'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [response, setResponse] = useState('')

  const revealPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = await postData('http://localhost:3333/register', {
      email,
      password,
    })

    if (!data.errors) {
      setPassword('')
      setEmail('')
      // close register
    }

    setResponse(data?.errors ? data.errors : data)

    setTimeout(() => {
      setResponse('')
    }, 5000)
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <label htmlFor='registerEmail'>Email: </label>
        <input
          id='registerEmail'
          type='text'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <label htmlFor='registerPassword'>Password: </label>
        <input
          id='registerPassword'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <label htmlFor='registerShowPassword'>Show password?</label>
        <input
          type='checkbox'
          id='registerShowPassword'
          value={showPassword}
          onChange={revealPassword}
        />
        <button type='submit'>register</button>
      </form>
      {response ? (
        <div>
          {response.title}: {response.detail}
        </div>
      ) : null}
    </FormWrapper>
  )
}

export default RegisterForm
