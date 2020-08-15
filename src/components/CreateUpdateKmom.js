import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import kmomService from '../services/kmoms'
import { useHistory } from 'react-router-dom'

const CreateUpdateKmom = () => {
  const history = useHistory()
  const [kmomNumber, setKmomNumber] = useState('')
  const [content, setContent] = useState('')
  const [githubLink, setGithubLink] = useState('')

  useEffect(() => {
    const fetchKmom = async () => {
      const fetchedKmom = await fetch(
        `http://localhost:3333/reports/week/${kmomNumber}`,
      )
      const parsedKmom = await fetchedKmom.json()
      setContent(parsedKmom.markdown ? parsedKmom.markdown : '')
      setGithubLink(parsedKmom.link ? parsedKmom.link : '')
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
    <form onSubmit={handleSubmit}>
      <label htmlFor='kmom-select'>Choose a kmom:</label>

      <select
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
      </select>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <input
        value={githubLink}
        onChange={(event) => setGithubLink(event.target.value)}
      />
      <ReactMarkdown source={content} />
      <button type='submit'>submit</button>
    </form>
  )
}

export default CreateUpdateKmom
