import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { GithubLink } from './Menu'
import PropTypes from 'prop-types'

const Markdown = ({ kmomId }) => {
  const [markdown, setMarkdown] = useState('')
  const [githubLink, setGithubLink] = useState('')

  useEffect(() => {
    const getMarkdown = async () => {
      const fetchedMd = await fetch(
        `http://localhost:3333/reports/week/${kmomId}`,
      )
      const parsedMd = await fetchedMd.json()
      setMarkdown(parsedMd.markdown)
      setGithubLink(parsedMd.link)
    }
    getMarkdown()
  }, [kmomId])

  if (!markdown) return <div>loading..</div>

  return (
    <>
      <ReactMarkdown source={markdown} />
      <GithubLink pathname={githubLink} linkText='Link to repo on Github' />
    </>
  )
}

Markdown.propTypes = {
  kmomId: PropTypes.string,
}

export default Markdown
