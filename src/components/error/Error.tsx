import './error.scss'

import React from 'react'

interface IPropsError {
  message: string
}

export const Error: React.FC<IPropsError> = ({ message }) => {
  return (
    <div className='errors'>
      <div className='error__message'>{message} :(</div>
    </div>
  )
}
