import './error.scss'

import { AxiosError } from 'axios'
import React from 'react'

interface IPropsError {
  error: Error | AxiosError<unknown> | null
}

export const Error: React.FC<IPropsError> = ({ error }) => {
  return (
    <div className='errors'>
      <div className='error__message'>{error?.message} :(</div>
    </div>
  )
}
