import './error.scss'

import { AxiosError } from 'axios'
import { type FC } from 'react'

interface IPropsError {
  error: Error | AxiosError<unknown> | null
}

const Error: FC<IPropsError> = ({ error }) => {
  return (
    <div className='errors'>
      <div className='error__message'>{error?.message} :(</div>
    </div>
  )
}

export default Error