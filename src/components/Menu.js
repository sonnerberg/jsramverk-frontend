import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GoMarkGithub } from 'react-icons/go'
import { device } from '../helpers'
import PropTypes from 'prop-types'

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
    id='githubUser'
  >
    {Boolean(linkText) && linkText} <GoMarkGithub />
  </StyledLink>
)

GithubLink.propTypes = {
  pathname: PropTypes.string,
  linkText: PropTypes.string,
}

const Menu = ({ userLoggedIn, files }) => {
  return (
    <Header>
      <H1>
        <StyledLink to='/'>JS-ramverk</StyledLink>
      </H1>
      <Flex>
        {userLoggedIn && <StyledLink to='/create'>create or update</StyledLink>}
        <StyledLinkDisappearing to='/'>Home</StyledLinkDisappearing>
        {files &&
          files.map((kmom, index) => (
            <StyledLinkDisappearing
              key={`${kmom}${index}`}
              to={`/reports/week/${
                (kmom && kmom.substring(4, 5)) === '0'
                  ? kmom && kmom.substring(5, 6)
                  : kmom && kmom.match(/\d+/)
              }`}
            >
              {kmom}
            </StyledLinkDisappearing>
          ))}
      </Flex>
      <GithubLink />
    </Header>
  )
}

Menu.propTypes = {
  userLoggedIn: PropTypes.bool,
  files: PropTypes.array,
  setFiles: PropTypes.func,
}

export default Menu
