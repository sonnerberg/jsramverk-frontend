import React, { useState, useEffect, useRef } from 'react'
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
  overflow: auto;
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

const socket = io.connect('http://localhost:8300')
// const socket = io.connect('https://socket-server.sonnerberg.me')

// https://stackoverflow.com/a/52266212
const ChatWindow = ({ chat }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [chat])

  return (
    <Messages className='all-messages'>
      {chat.map(({ time, name, message }, index) => (
        <p key={index + Math.random()}>
          {time} {name} {message ? ':' : ''} {message}
        </p>
      ))}
      <div ref={messagesEndRef} />
    </Messages>
  )
}

const Chat = () => {
  const [message, setMessage] = useState('')
  const [nickname, setNickname] = useState(
    localStorage.getItem('sonnerbergChatNickname') || '',
  )
  const [chat, setChat] = useState([])
  const [name, setName] = useState('')
  const [connectedUsers, setConnectedUsers] = useState([])

  const timeFormat = new Intl.DateTimeFormat('sv', {
    timeStyle: 'short',
    timeZone: 'Europe/Stockholm',
  })

  useEffect(() => {
    socket.emit('userConnected')
  }, [])

  useEffect(() => {
    socket.once('chat message', ({ time, name, message }) => {
      setChat((chat) => [...chat, { time, name, message }])
    })
    socket.on('join room', ({ time, name, message, connectedUsers }) => {
      setChat((chat) => [...chat, { time, name, message }])
      setConnectedUsers(connectedUsers)
    })
    socket.on('leave room', ({ connectedUsers }) => {
      setConnectedUsers(connectedUsers)
    })
    socket.on('history', (history) => {
      console.log('about to set history')
      setChat([...history])
    })
    return () => {
      socket.off('chat message')
      socket.off('join room')
      socket.off('leave room')
      socket.off('history')
    }
  }, [chat])

  const handleChangeNickname = (event) => {
    event.preventDefault()
    setNickname(event.target.value)
    localStorage.setItem('sonnerbergChatNickname', event.target.value)
  }

  const handleSubmitNickname = (event) => {
    event.preventDefault()
    const time = `${timeFormat.format(Date.now())}`
    setName(nickname)
    // setChat((chat) => [
    //   ...chat,
    //   { time, name: nickname, message: 'joined the chat.' },
    // ])
    socket.emit('join room', { name: nickname })
  }

  const handleChangeMessage = (event) => {
    event.preventDefault()
    setMessage(event.target.value)
  }

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const time = `${timeFormat.format(Date.now())}`
    if (message) {
      socket.emit('chat message', { name, message })
      setChat((chat) => [...chat, { time, name, message }])
      setMessage('')
    }
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
            autoFocus
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
        <ChatWindow chat={chat} />
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
