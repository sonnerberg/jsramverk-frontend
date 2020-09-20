import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Message from './ColoredMessage'

test('renders content', () => {
  const message = {
    type: 'error',
    msg: 'error from testing',
  }

  const component = render(<Message message={message} />)
  const coloredMessage = component.getByTestId('colored-message')

  expect(coloredMessage).toHaveTextContent('error from testing')
})
