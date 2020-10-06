import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'

const Grid = styled.div`
  height: 50vh;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-template-areas:
    'messages messages messages messages users'
    'messages messages messages messages users'
    'messages messages messages messages users'
    'messages messages messages messages users'
    'messages messages messages messages users'
    'footer footer footer footer footer';
`

const NewMessage = styled.form`
  grid-area: footer;
`

const Messages = styled.div`
  grid-area: messages;
  border: 1px solid black;
  line-height: 1.2;
`

const Users = styled.aside`
  grid-area: users;
  border: 1px solid black;
  text-align: center;
  line-height: 1.2;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  box-sizing: border-box;
`

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

// const socket = io.connect('http://localhost:8300')
const socket = io.connect('https://socket-server.sonnerberg.me')

const Chat = () => {
  const [message, setMessage] = useState('')
  const [nickname, setNickname] = useState('')
  const [chat, setChat] = useState([])
  const [name, setName] = useState('')
  const [connectedUsers, setConnectedUsers] = useState([])

  socket.on('connect', () => {
    console.info('Connected to socket')
  })

  useEffect(() => {
    socket.on('chat message', ({ time, name, message }) => {
      setChat([...chat, { time, name, message }])
    })
    socket.on('join room', ({ time, name, message, connectedUsers }) => {
      setChat([...chat, { time, name, message }])
      setConnectedUsers(connectedUsers)
    })
    socket.on('leave room', ({ connectedUsers }) => {
      setConnectedUsers(connectedUsers)
    })
  })

  // TODO:
  // Save nickname in localStorage

  const handleChangeNickname = (event) => {
    event.preventDefault()
    setNickname(event.target.value)
  }

  const handleSubmitNickname = (event) => {
    event.preventDefault()
    setName(nickname)
    socket.emit('join room', { name: nickname })
  }

  const handleChangeMessage = (event) => {
    event.preventDefault()
    setMessage(event.target.value)
  }

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    // setChat([...chat, message])
    if (message) socket.emit('chat message', { name, message })
    setMessage('')
  }

  if (!name) {
    return (
      <Centered>
        <form onSubmit={handleSubmitNickname}>
          <label htmlFor='set-nickname'>Nickname:</label>
          <input
            name='set-nickname'
            onChange={handleChangeNickname}
            value={nickname}
          />
          <button type='submit'>Set</button>
        </form>
      </Centered>
    )
  }

  return (
    <div className='wrapper'>
      <Grid>
        <Users className='connected-users'>
          <div>Connected users</div>
          {connectedUsers.map(({ name }, index) => (
            <div key={index + Math.random()}>{name}</div>
          ))}
        </Users>
        <Messages className='all-messages'>
          {chat.map(({ time, name, message }, index) => (
            <p key={index + Math.random()}>
              {time} {name} {message ? ':' : ''} {message}
            </p>
          ))}
        </Messages>
        <NewMessage onSubmit={handleSubmitMessage}>
          <label htmlFor='set-message'>Message:</label>
          <Input
            name='set-message'
            onChange={handleChangeMessage}
            value={message}
            autoFocus
          />
        </NewMessage>
      </Grid>
    </div>
  )
}

export default Chat