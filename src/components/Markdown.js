import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { GithubLink } from './Menu'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Markdown = ({ kmomId, userLoggedIn }) => {
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

  // Check for githubLink because it has to be present in database
  if (!githubLink) return <div>loading..</div>

  return (
    <>
      <ReactMarkdown source={markdown} />
      <GithubLink pathname={githubLink} linkText='Link to repo on Github' />
      {userLoggedIn && <Link to={`/create/${kmomId}`}>edit this page</Link>}
    </>
  )
}

Markdown.propTypes = {
  kmomId: PropTypes.string,
  userLoggedIn: PropTypes.bool,
}

export default Markdown
