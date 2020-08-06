import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled from 'styled-components'
import { importMDX } from 'mdx.macro'
import Home from './Home'
import Menu from './Menu'
// import { reports } from '../helpers/'
// import Reports from './Reports'

const Content = lazy(() => importMDX('../../../README.mdx'))

const Centered = styled.main`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    > h1 {
      font-size: 3rem;
    }
    > p {
      color: red;
    }
  }
`

const App = () => {
  // const match = useRouteMatch('/reports/week/:id')
  // const report = match
  //   ? reports.find((report) => report.id === Number(match.params.id))
  //   : null

  return (
    <>
      <Reset />
      <Menu />
      <Switch>
        <Route path='/reports/week/:id'>
          <Suspense fallback={<div>Loading...</div>}>
            <Centered>
              <Content />
              <div style={{ paddingTop: '10px' }}>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://github.com/RichardNilsson/jsramverk'
                >
                  Link to Github
                </a>
              </div>
            </Centered>
          </Suspense>
          {/* <Reports report={report ? report : { content: 'no report yet' }} /> */}
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default App
