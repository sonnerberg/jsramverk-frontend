import PropTypes from 'prop-types'
import React, { useState, useImperativeHandle } from 'react'
import { FlexEnd } from './LoginForm'

const Toggleable = React.forwardRef(
  ({ buttonLabel, children, backgroundColor }, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {
      display: visible ? 'none' : '',
      backgroundColor: backgroundColor,
    }
    const showWhenVisible = {
      display: visible ? '' : 'none',
      backgroundColor: backgroundColor,
    }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      }
    })

    return (
      <div>
        <div>
          <FlexEnd style={hideWhenVisible}>
            <button onClick={toggleVisibility} id={`show${buttonLabel}`}>
              {buttonLabel}
            </button>
          </FlexEnd>
          <div style={showWhenVisible}>
            {children}
            <div>
              <button
                onClick={toggleVisibility}
                style={{ margin: 'auto', display: 'block' }}
              >
                cancel {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string,
}

export default Toggleable
