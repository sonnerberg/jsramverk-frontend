import React from 'react'
import Header from './Menu'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header /> <div style={{ paddingBottom: '5rem' }}>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
