import styles from './validationMessage.module.scss'

import cx from 'classnames'
import { type FC } from 'react'
import { joinClasses } from '../../../helpers/joinClasses.helper'
import { IPropsValidationMessage } from './ValidationMessage.interface'

const ValidationMessage: FC<IPropsValidationMessage> = ({ children, className }) => {
  return (
    <div className={cx(styles.error, joinClasses(styles, className))}>
      { children }
    </div>
  )
}

export default ValidationMessage