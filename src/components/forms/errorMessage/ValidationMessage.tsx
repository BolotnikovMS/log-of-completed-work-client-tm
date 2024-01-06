import './validation-message.scss'

import cx from 'classnames'
import { type FC } from 'react'
import { IPropsValidationMessage } from './ValidationMessage.interface'

const ValidationMessage: FC<IPropsValidationMessage> = ({ children, className }) => {
  return (
    <div className={cx('form__error', className)}>
      { children }
    </div>
  )
}

export default ValidationMessage