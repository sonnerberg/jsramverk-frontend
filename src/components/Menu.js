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
  @media ${device.mobileM} {
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
`

const H1 = styled.h1`
  font-size: 1.8rem;
  padding: 0.5rem;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

export const GithubLink = ({ linkText, pathname }) => (
  <StyledLink
    to={
      pathname
        ? { pathname }
        : { pathname: 'https://github.com/sonnerberg/jsramverk-frontend' }
    }
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
  return (
    <Header>
      <H1>
        <StyledLink to='/'>JS-ramverk</StyledLink>
      </H1>
      <Flex>
        <StyledLinkDisappearing to='/'>Home</StyledLinkDisappearing>
        <StyledLinkDisappearing to='/reports/week/1'>
          First report
        </StyledLinkDisappearing>
        <StyledLinkDisappearing to='/reports/week/2'>
          Second report
        </StyledLinkDisappearing>
      </Flex>
      <GithubLink />
    </Header>
  )
}

export default Menu
