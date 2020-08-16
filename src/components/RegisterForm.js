import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import PropTypes from 'prop-types'

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
    </FormWrapper>
  )
}

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
}

export default RegisterForm
