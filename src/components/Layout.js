import React from 'react'
import Header from './Menu'
import Footer from './Footer'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <>
      <Header /> <div style={{ paddingBottom: '5rem' }}>{children}</div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
