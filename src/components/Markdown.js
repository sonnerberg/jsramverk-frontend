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
      const url =
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === 'production'
          ? `https://me-api.sonnerberg.me/reports/week/${kmomId}`
          : `/reports/week/${kmomId}`
      const fetchedMd = await fetch(url)
      const parsedMd = await fetchedMd.json()
      setMarkdown(parsedMd.markdown)
      setGithubLink(parsedMd.link)
      document.title = `Kursmoment ${kmomId} | JS-ramverk`
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
