import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
`

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`

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
        <SpaceBetween>
          <label htmlFor='loginEmail'>Email: </label>
          <input
            id='loginEmail'
            type='text'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </SpaceBetween>
        <SpaceBetween>
          <label htmlFor='loginPassword'>Password: </label>
          <input
            id='loginPassword'
            type='password'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </SpaceBetween>
        <FlexEnd>
          <button type='submit' id='login'>
            login
          </button>
        </FlexEnd>
      </form>
    </FormWrapper>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
