import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const ColoredMessage = styled.div`
  color: ${(props) => (props.type === 'error' ? 'red' : 'green')};
  position: absolute;
  z-index: 1000;
  background-color: white;
`
const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Message = ({ message }) => {
  return (
    <MessageWrapper>
      <ColoredMessage type={message.type}>{message.msg}</ColoredMessage>
    </MessageWrapper>
  )
}
Message.propTypes = {
  message: PropTypes.object,
}

export default Message
