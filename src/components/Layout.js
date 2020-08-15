import React from 'react'
import Header from './Menu'
import Footer from './Footer'
import PropTypes from 'prop-types'

const Layout = ({ children, userLoggedIn }) => {
  return (
    <>
      <Header userLoggedIn={userLoggedIn} />
      <div style={{ paddingBottom: '5rem' }}>{children}</div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  userLoggedIn: PropTypes.bool,
}

export default Layout
