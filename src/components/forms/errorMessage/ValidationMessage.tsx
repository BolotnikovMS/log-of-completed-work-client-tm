import cx from 'classnames'
import { type FC } from 'react'
import { IPropsValidationMessage } from './ValidationMessage.interface'
import './validationMessage.scss'

const ValidationMessage: FC<IPropsValidationMessage> = ({ children, className }) => {
  return (
    <div className={cx('validation-error', className)}>
      {children}
    </div>
  )
}

export default ValidationMessage
