import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'
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

const Home = () => {
  const thisYear = new Date().getFullYear()
  return (
    <Centered>
      <H1>This is JS-ramverk</H1>
      <P>
        I&apos;m Richard and this is the first page for the course{' '}
        <ExternalLink pathname='https://www.jsramverk.se' text='jsramverk' />.
      </P>
      <Image src='https://avatars1.githubusercontent.com/u/31686265?s=460&u=b237572a2ca661ec50a7e2a4ce362d3ce67e751f&v=4' />
      <P style={{ alignSelf: 'flex-start' }}>
        I am currently {thisYear - 1986} years old and residing in Helsingborg.
      </P>
      <P>
        I have been studying web development remotely for a few years now. I
        actually did my first attempt in 2014, trying to complete the
        introductory Python course at{' '}
        <ExternalLink
          pathname='https://www.bth.se'
          text='Blekinge Tekniska Högskola'
        />{' '}
        (BTH). That time I did not finish the course but in 2018 I came back in
        almost full force and gave studying another shot.
      </P>
      <P>
        Since 2018 I have studied the &quot;course package&quot;{' '}
        <ExternalLink
          pathname='https://www.bth.se/kurspaket/KP667/20202/'
          text='Webbprogrammering och Databaser'
        />{' '}
        and in 2019 I started studying the full{' '}
        <ExternalLink
          text='program'
          pathname='https://www.bth.se/utbildning/program/pagwg/'
        />
        . Right now I have completed enough points for almost one year (I have a
        few points here and there to collect from the first year).
      </P>
      <P>
        While studying at BTH I have also been studying other courses at other
        swedish universities such as Umeå Universitet and Uppsala Universitet.
      </P>
      <P>
        During the last summer I have been hard at work studying{' '}
        <ExternalLink
          pathname='https://www.fullstackopen.com/en'
          text='Fullstack Open'
        />{' '}
        and at the moment I have completed the first 7 parts of the program and
        I am looking forward to continue with the GraphQL and TypeScript parts
        as time permits during the fall.
      </P>
      <P>
        I also recently found a very interesting book at O&apos;Reilly which is
        called{' '}
        <ExternalLink
          pathname='https://www.oreilly.com/library/view/javascript-everywhere/9781492046974/'
          text='JavaScript Everywhere'
        />{' '}
        that I also plan to go through as time permits during the fall.
      </P>
      <P style={{ alignSelf: 'flex-start' }}>
        I am looking forward to diving into more JavaScript frameworks.
      </P>
    </Centered>
  )
}

export default Home
