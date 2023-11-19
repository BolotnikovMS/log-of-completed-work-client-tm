import './error.scss'

import { AxiosError } from 'axios';
import React from 'react'

interface IPropsError {
  error: AxiosError<unknown>
}

export const Error: React.FC<IPropsError> = ({ error }) => {
  return (
    <div className='errors'>
      <div className='error__message'>{error?.message} :(</div>
    </div>
  )
}
