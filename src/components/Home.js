import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'
import PropTypes from 'prop-types'

const Centered = styled.main`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
`

const Image = styled.img`
  border-radius: 50%;
  max-width: 14rem;
  margin: 0.5rem;
`

const H1 = styled.h1`
  font-size: 2rem;
  font-family: sans-serif;
`

const P = styled.p`
  padding: 0.5rem;
  line-height: 1.5;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: teal;
`

const ExternalLink = ({ pathname, text }) => (
  <StyledLink
    to={{
      pathname,
    }}
    target='_blank'
    rel='noopener noreferrer'
  >
    {text} <FiExternalLink />
  </StyledLink>
)

ExternalLink.propTypes = {
  pathname: PropTypes.string,
  text: PropTypes.string,
}

const Home = () => {
  const [index, setIndex] = useState('')
  useEffect(() => {
    const getIndex = async () => {
      try {
        const fetchedIndex = await fetch('/me').then((result) => result.json())
        setIndex(fetchedIndex)
      } catch {
        console.log('cannot fetch')
      }
    }
    getIndex()
  }, [])

  if (!index) return <Centered>loading...</Centered>

  return (
    <Centered>
      <H1>{index.main_heading}</H1>
      <P>
        {index.paragraph0.text}{' '}
        <ExternalLink
          pathname={index.paragraph0.link.url}
          text={index.paragraph0.link.text}
        />
        .
      </P>
      <Image src={index.github_avatar.url} />
      <P style={{ alignSelf: 'flex-start' }}>{index.paragraph1.text}</P>
      <P>
        {index.paragraph2.first_part.text}
        <ExternalLink
          pathname={index.paragraph2.first_part.link.url}
          text={index.paragraph2.first_part.link.text}
        />{' '}
        {index.paragraph2.second_part.text}
      </P>
      <P>
        {index.paragraph3.first_part.text}
        <ExternalLink
          pathname={index.paragraph3.first_part.link.url}
          text={index.paragraph3.first_part.link.text}
        />
        {index.paragraph3.second_part.text}
        <ExternalLink
          text={index.paragraph3.second_part.link.text}
          pathname={index.paragraph3.second_part.link.url}
        />
        {index.paragraph3.third_part.text}
      </P>
      <P>{index.paragraph4.text}</P>
      <P>
        {index.paragraph5.first_part.text}
        <ExternalLink
          pathname={index.paragraph5.first_part.link.url}
          text={index.paragraph5.first_part.link.text}
        />
        {index.paragraph5.second_part.text}
      </P>
      <P>
        {index.paragraph6.first_part.text}
        <ExternalLink
          pathname={index.paragraph6.first_part.link.url}
          text={index.paragraph6.first_part.link.text}
        />
        {index.paragraph6.second_part.text}
      </P>
      <P style={{ alignSelf: 'flex-start' }}>{index.paragraph7.text}</P>
    </Centered>
  )
}

export default Home
