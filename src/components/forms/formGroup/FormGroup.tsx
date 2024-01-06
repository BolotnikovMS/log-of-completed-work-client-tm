import './form-group.scss'

import cx from 'classnames'
import { type FC } from 'react'
import { IPropsFormGroup } from './formGroup.interface'

const FormGroup: FC<IPropsFormGroup> = ({ className, children, ...attributes }) => {
  return (
    <div className={cx('form__group', className)} {...attributes}>
      {children}
    </div>
  )
}

export default FormGroup