import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GoMarkGithub } from 'react-icons/go'
import { device } from '../helpers'
import PropTypes from 'prop-types'

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-family: sans-serif;
  :hover {
    color: blue;
  }
  margin-right: 0.5rem;
`

const StyledLinkDisappearing = styled(StyledLink)`
  @media ${device.all} {
    display: none;
  }
  @media ${device.mobileS} {
    display: inline;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
  background: cornflowerblue;
  flex-wrap: wrap;
`

const H1 = styled.h1`
  font-size: 1.8rem;
  padding: 0.5rem;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-wrap: wrap;
`

export const GithubLink = ({ linkText, pathname }) => (
  <StyledLink
    to={pathname ? { pathname } : { pathname: 'https://github.com/sonnerberg' }}
    target='_blank'
    rel='noopener noreferrer'
    style={{ marginTop: linkText ? '0.5rem' : '' }}
  >
    {Boolean(linkText) && linkText} <GoMarkGithub />
  </StyledLink>
)

GithubLink.propTypes = {
  pathname: PropTypes.string,
  linkText: PropTypes.string,
}

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [response, setResponse] = useState('')

  const revealPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postData('http://localhost:3333/login', {
      email,
      password,
    }).then((data) => {
      data.data?.token &&
        localStorage.setItem(
          'jsramverk-sonnerberg',
          JSON.stringify({ token: data?.data?.token }),
        )
      setResponse(data.errors ? data.errors : data)
    })
    setTimeout(() => {
      setResponse('')
    }, 5000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <input type='checkbox' value={showPassword} onChange={revealPassword} />
        <button type='submit'>login</button>
        {response ? (
          <div>
            {response.title && response.title + ': '}
            {response.detail && response.detail}
          </div>
        ) : null}
      </form>
    </div>
  )
}
const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [response, setResponse] = useState('')

  const revealPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postData('http://localhost:3333/register', {
      email,
      password,
    }).then((data) => setResponse(data.errors ? data.errors : data))
    setTimeout(() => {
      setResponse('')
    }, 5000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <input type='checkbox' value={showPassword} onChange={revealPassword} />
        <button type='submit'>register</button>
        {response ? (
          <div>
            {response.title}: {response.detail}
          </div>
        ) : null}
      </form>
    </div>
  )
}

const Menu = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      const fetchedFiles = await fetch('http://localhost:3333/reports/week')
      const parsedFiles = await fetchedFiles.json()
      setFiles(parsedFiles.data)
    }
    fetchFiles()
  }, [])

  return (
    <Header>
      <H1>
        <StyledLink to='/'>JS-ramverk</StyledLink>
      </H1>
      <Flex>
        <StyledLinkDisappearing to='/'>Home</StyledLinkDisappearing>
        {files.map((kmom, index) => (
          <StyledLinkDisappearing
            key={`${kmom}${index}`}
            to={`/reports/week/${
              kmom.substring(4, 5) === '0'
                ? kmom.substring(5, 6)
                : kmom.match(/\d+/)
            }`}
          >
            {kmom}
          </StyledLinkDisappearing>
        ))}
      </Flex>
      <GithubLink />
      <div>
        <LoginForm />
      </div>
    </Header>
  )
}

export default Menu
