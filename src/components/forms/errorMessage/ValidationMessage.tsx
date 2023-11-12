import './validation-message.scss'

import { IPropsValidationMessage } from './ValidationMessage.interface'
import React from 'react'
import cx from 'classnames'

export const ValidationMessage: React.FC<IPropsValidationMessage> = ({ children, className }) => {
  return (
    <div className={cx('form__error', className)}>
      { children }
    </div>
  )
}
