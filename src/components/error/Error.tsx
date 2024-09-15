import './error.scss'
import { AxiosError } from 'axios'
import { type FC } from 'react'
import { errorHandler } from '../../helpers/errorHandler.helper'

interface IPropsError {
  error: Error | AxiosError<unknown>
}

const Error: FC<IPropsError> = ({ error }) => {
  return (
    <div className='errors'>
      <div className='error__message'>{ errorHandler(error) } :(</div>
    </div>
  )
}

export default Error