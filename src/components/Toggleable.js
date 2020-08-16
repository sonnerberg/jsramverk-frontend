import PropTypes from 'prop-types'
import React, { useState, useImperativeHandle } from 'react'

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
          <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{buttonLabel}</button>
          </div>
          <div style={showWhenVisible}>
            {children}
            <button onClick={toggleVisibility}>cancel {buttonLabel}</button>
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
