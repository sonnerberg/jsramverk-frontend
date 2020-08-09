import React, { useState, useEffect } from 'react'
import Markdown from './../README.md'
import ReactMarkdown from 'react-markdown'

const MarkDownWeek1 = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const getMarkdown = async () => {
      const fetchedMd = await fetch(Markdown)
      const parsedMd = await fetchedMd.text()
      setMarkdown(parsedMd)
    }
    getMarkdown()
  }, [])

  if (!markdown) return <div>loading..</div>

  return <ReactMarkdown source={markdown} />
}

export default MarkDownWeek1
