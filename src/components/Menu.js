import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GoMarkGithub } from 'react-icons/go'

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-family: sans-serif;
  :hover {
    color: blue;
  }
  margin-right: 0.5rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5vh;
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

const Menu = () => {
  return (
    <Header>
      <H1>
        <StyledLink to='/'>JS-ramverk</StyledLink>
      </H1>
      <Flex>
        <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='/reports/week/1'>First report</StyledLink>
      </Flex>
      <StyledLink to='https://github.com/RichardNilsson/jsramverk'>
        <GoMarkGithub />
      </StyledLink>
    </Header>
  )
}

export default Menu
