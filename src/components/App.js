import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled from 'styled-components'
import Home from './Home'
import Layout from './Layout'
import Markdown from './Markdown'
import LoginForm from './LoginForm'
import Toggleable from './Toggleable'
import RegisterForm from './RegisterForm'
import loginService from '../services/login'
import kmomService from '../services/kmoms'
import CreateUpdateKmom from './CreateUpdateKmom'

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
  const loginFormRef = React.createRef()
  const history = useHistory()
  const match = useRouteMatch('/reports/week/:id')
  const [user, setUser] = useState(null)
  // const report = match
  //   ? reports.find((report) => report.id === Number(match.params.id))
  //   : null
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('jsramverkSonnerberg')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      kmomService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('jsramverkSonnerberg')
    setUser(null)
    history.push('/')
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      if (user) {
        window.localStorage.setItem('jsramverkSonnerberg', JSON.stringify(user))
        loginFormRef.current.toggleVisibility()
        setUser(user)
        kmomService.setToken(user.token)
      }
    } catch (exception) {
      console.error('Wrong credentials')
      console.error(exception)
      // dispatch(addNewNotification('Wrong credentials', error, 5))
    }
  }

  return (
    <FullHeight>
      <Reset />
      <Switch>
        <Route path='/create'>
          <Layout userLoggedIn={Boolean(user)}>
            {user ? (
              <button type='button' onClick={handleLogout}>
                logout {user.email}
              </button>
            ) : (
              <>
                <Toggleable
                  buttonLabel='login'
                  backgroundColor='cornflowerblue'
                  ref={loginFormRef}
                >
                  <LoginForm handleLogin={handleLogin} />
                </Toggleable>
                <Toggleable
                  buttonLabel='register'
                  backgroundColor='cornflowerblue'
                >
                  <RegisterForm />
                </Toggleable>
              </>
            )}
            <CreateUpdateKmom />
          </Layout>
        </Route>
        <Route path='/reports/week/:id'>
          <Layout userLoggedIn={Boolean(user)}>
            {user ? (
              <button type='button' onClick={handleLogout}>
                logout {user.email}
              </button>
            ) : (
              <>
                <Toggleable
                  buttonLabel='login'
                  backgroundColor='cornflowerblue'
                  ref={loginFormRef}
                >
                  <LoginForm handleLogin={handleLogin} />
                </Toggleable>
                <Toggleable
                  buttonLabel='register'
                  backgroundColor='cornflowerblue'
                >
                  <RegisterForm />
                </Toggleable>
              </>
            )}
            <Centered>
              <Markdown kmomId={match && match.params.id} />
            </Centered>
          </Layout>
          {/* <Reports report={report ? report : { content: 'no report yet' }} /> */}
        </Route>
        <Route path='/'>
          <Layout userLoggedIn={Boolean(user)}>
            {user ? (
              <button type='button' onClick={handleLogout}>
                logout {user.email}
              </button>
            ) : (
              <>
                <Toggleable
                  buttonLabel='login'
                  backgroundColor='cornflowerblue'
                  ref={loginFormRef}
                >
                  <LoginForm handleLogin={handleLogin} />
                </Toggleable>
                <Toggleable
                  buttonLabel='register'
                  backgroundColor='cornflowerblue'
                >
                  <RegisterForm />
                </Toggleable>
              </>
            )}
            <Home />
          </Layout>
        </Route>
      </Switch>
    </FullHeight>
  )
}

export default App
