import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <>
      <div style={{ paddingBottom: '5rem' }}>{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default Layout
