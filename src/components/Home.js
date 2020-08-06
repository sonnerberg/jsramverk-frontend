import React from 'react'
import styled from 'styled-components'
const Centered = styled.main`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Home = () => <Centered>This is home</Centered>

export default Home
