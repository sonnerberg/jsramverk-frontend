import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled from 'styled-components'
import Home from './Home'
import { GithubLink } from './Menu'
import Layout from './Layout'
import MarkdownWeek1 from './MarkdownWeek1'
// import { reports } from '../helpers/'
// import Reports from './Reports'

const Centered = styled.main`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-size: 2rem;
    padding-top: 1rem;
  }
  > p {
    color: black;
    padding: 0.4rem;
  }
  > pre {
    padding: 0.3rem;
    background: black;
    color: white;
    line-height: 1.5;
  }
`

const FullHeight = styled.div`
  min-height: 100vh;
  position: relative;
`

const App = () => {
  // const match = useRouteMatch('/reports/week/:id')
  // const report = match
  //   ? reports.find((report) => report.id === Number(match.params.id))
  //   : null

  return (
    <FullHeight>
      <Reset />
      <Switch>
        <Route path='/reports/week/:id'>
          <Layout>
            <Centered>
              <MarkdownWeek1 />
              <GithubLink linkText='Link to Github' />
            </Centered>
          </Layout>
          {/* <Reports report={report ? report : { content: 'no report yet' }} /> */}
        </Route>
        <Route path='/'>
          <Layout>
            <Home />
          </Layout>
        </Route>
      </Switch>
    </FullHeight>
  )
}

export default App
