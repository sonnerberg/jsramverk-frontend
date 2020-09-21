import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import PropTypes from 'prop-types'
import { SpaceBetween } from './LoginForm'

const RegisterForm = ({ handleRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const revealPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await handleRegister({ email, password })

    if (success) {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} id='registerForm'>
        <SpaceBetween>
          <label htmlFor='registerEmail'>Email: </label>
          <input
            id='registerEmail'
            type='text'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </SpaceBetween>
        <SpaceBetween>
          <label htmlFor='registerPassword'>Password: </label>
          <input
            id='registerPassword'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </SpaceBetween>
        <SpaceBetween>
          <label htmlFor='registerShowPassword'>Show password?</label>
          <input
            type='checkbox'
            id='registerShowPassword'
            value={showPassword}
            onChange={revealPassword}
          />
          <button type='submit' id='registerButton'>
            register
          </button>
        </SpaceBetween>
      </form>
    </FormWrapper>
  )
}

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
}

export default RegisterForm
