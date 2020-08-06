import React from 'react'
import PropTypes from 'prop-types'
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

const Reports = ({ report }) => {
  return <Centered>{report?.content}</Centered>
}

export default Reports

Reports.propTypes = {
  report: PropTypes.object,
}
