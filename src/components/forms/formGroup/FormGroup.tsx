import './form-group.scss'

import { IPropsFormGroup } from './formGroup.interface'
import React from 'react'
import cx from 'classnames'

export const FormGroup: React.FC<IPropsFormGroup> = ({ className, children, ...attributes }) => {
  return (
    <div className={cx('form__group', className)} {...attributes}>
      {children}
    </div>
  )
}
