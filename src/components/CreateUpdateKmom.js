import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import kmomService from '../services/kmoms'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Select = styled.select`
  display: block;
`

const Textarea = styled.textarea`
  display: block;
  width: 60vw;
  height: 25vh;
`

const Input = styled.input`
  box-sizing: content-box;
  display: block;
  width: 60vw;
  border-left-width: unset;
  border-right-width: unset;
`

const StyledMarkdown = styled(ReactMarkdown)`
  max-width: 60vw;
`

const CreateUpdateKmom = ({ kmomId, userLoggedIn }) => {
  const history = useHistory()
  const [kmomNumber, setKmomNumber] = useState(kmomId || '')
  const [content, setContent] = useState('')
  const [githubLink, setGithubLink] = useState('')

  useEffect(() => {
    const fetchKmom = async () => {
      if (kmomNumber) {
        const fetchedKmom = await fetch(
          `http://localhost:3333/reports/week/${kmomNumber}`,
        )
        const parsedKmom = await fetchedKmom.json()
        setContent(parsedKmom.markdown ? parsedKmom.markdown : '')
        setGithubLink(
          parsedKmom.link ? parsedKmom.link : 'http://www.github.com/',
        )
      }
    }
    fetchKmom()
  }, [kmomNumber])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const kmom = await kmomService.create({
      kmomNumber,
      content,
      githubLink,
    })
    if (kmom) history.push(kmom.match(/\/reports.*$/)[0])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='kmom-select'>Choose a kmom:</label>

        <Select
          name='kmoms'
          id='kmom-select'
          value={kmomNumber}
          onChange={(event) => setKmomNumber(event.target.value)}
        >
          <option value=''>--Please choose an option--</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <option key={Math.random()} value={number}>
              Kmom{String(number).padStart(2, '0')}
            </option>
          ))}
        </Select>
        <label htmlFor='kmom-text'>Text:</label>
        <Textarea
          id='kmom-text'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></Textarea>
        <label htmlFor='kmom-link'>Github link:</label>
        <Input
          id='kmom-link'
          value={githubLink}
          onChange={(event) => setGithubLink(event.target.value)}
        />
        <button type='submit'>submit</button>
      </form>
      <StyledMarkdown source={content} />
    </div>
  )
}

export default CreateUpdateKmom
