import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GoMarkGithub } from 'react-icons/go'
import { device } from '../helpers'
import PropTypes from 'prop-types'
import Toggleable from './Toggleable'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

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
    <>
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
      </Header>
      <Toggleable buttonLabel='login'>
        <LoginForm />
      </Toggleable>
      <Toggleable buttonLabel='register'>
        <RegisterForm />
      </Toggleable>
    </>
  )
}

export default Menu
