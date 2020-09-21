import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
} from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled from 'styled-components'
import Home from './Home'
import Layout from './Layout'
import Markdown from './Markdown'
import LoginForm from './LoginForm'
import Toggleable from './Toggleable'
import RegisterForm from './RegisterForm'
import loginService from '../services/login'
import registerService from '../services/register'
import kmomService from '../services/kmoms'
import Header from './Menu'
import Footer from './Footer'
import CreateUpdateKmom from './CreateUpdateKmom'
import Message from './ColoredMessage'

const Centered = styled.main`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 2rem;
    padding-top: 1rem;
  }
  p {
    color: black;
    padding: 0.4rem;
  }
  pre {
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
  const registerFormRef = React.createRef()
  const history = useHistory()
  const reportMatch = useRouteMatch('/reports/week/:id')
  const createMatch = useRouteMatch('/create/:id')
  const [message, setMessage] = useState({})
  const [user, setUser] = useState(null)
  const [files, setFiles] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('jsramverkSonnerberg')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      kmomService.setToken(user.token)
    }
    const fetchFiles = async () => {
      const url =
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === 'production'
          ? 'https://me-api.sonnerberg.me/reports'
          : '/reports'
      const fetchedFiles = await fetch(url)
      const { data } = await fetchedFiles.json()
      setFiles(data)
    }
    fetchFiles()
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('jsramverkSonnerberg')
    setUser(null)
    history.push('/')
  }

  const handleLogin = async (loginObject) => {
    // try {
    const user = await loginService.login(loginObject)

    if (user) {
      window.localStorage.setItem('jsramverkSonnerberg', JSON.stringify(user))
      loginFormRef.current.toggleVisibility()
      setUser(user)
      kmomService.setToken(user.token)
      setMessage({ type: 'success', msg: 'user logged in' })
      setTimeout(() => {
        setMessage({})
      }, 3000)
    } else {
      setMessage({ type: 'error', msg: 'Wrong credentials' })
      setTimeout(() => {
        setMessage({})
      }, 3000)
    }
    // } catch (exception) {
    //   console.error(exception)
    //   // dispatch(addNewNotification('Wrong credentials', error, 5))
    // }
  }

  const handleRegister = async (registerObject) => {
    try {
      await registerService.register(registerObject)

      const user = await loginService.login(registerObject)

      if (user) {
        window.localStorage.setItem('jsramverkSonnerberg', JSON.stringify(user))
        registerFormRef.current.toggleVisibility()
        setUser(user)
        kmomService.setToken(user.token)
        setMessage({ type: 'success', msg: 'user created and logged in' })
        setTimeout(() => {
          setMessage({})
        }, 3000)
      } else {
        setMessage({
          type: 'error',
          msg: 'User not created.',
        })
        setTimeout(() => {
          setMessage({})
        }, 3000)
      }
    } catch (exception) {
      console.error(exception)
      // dispatch(addNewNotification('Wrong credentials', error, 5))
    }
  }

  return (
    <FullHeight>
      <Reset />
      {message && <Message message={message} />}
      <Header userLoggedIn={Boolean(user)} files={files} />
      {user ? (
        <div style={{ backgroundColor: 'cornflowerblue' }}>
          <button type='button' onClick={handleLogout} id='logout'>
            logout {user?.email}
          </button>
        </div>
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
            ref={registerFormRef}
            buttonLabel='register'
            backgroundColor='cornflowerblue'
          >
            <RegisterForm handleRegister={handleRegister} />
          </Toggleable>
        </>
      )}
      <Switch>
        <Route exact path='/'>
          <Layout>
            <Home />
          </Layout>
        </Route>
        <Route path='/create/:id'>
          <Layout>
            {user ? (
              <Centered>
                <CreateUpdateKmom
                  kmomId={createMatch && createMatch.params.id}
                  userLoggedIn={Boolean(user)}
                  files={files}
                  setFiles={setFiles}
                />
              </Centered>
            ) : (
              <Redirect to='/' />
            )}
          </Layout>
        </Route>
        <Route path='/create'>
          <Layout>
            {user ? (
              <Centered>
                <CreateUpdateKmom files={files} setFiles={setFiles} />
              </Centered>
            ) : (
              <Redirect to='/' />
            )}
          </Layout>
        </Route>
        <Route path='/reports/week/:id'>
          <Layout>
            <Centered>
              <Markdown
                kmomId={reportMatch && reportMatch.params.id}
                userLoggedIn={Boolean(user)}
              />
            </Centered>
          </Layout>
        </Route>
      </Switch>
      <Footer />
    </FullHeight>
  )
}

export default App
