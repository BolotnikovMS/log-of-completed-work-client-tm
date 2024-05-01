import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { joinClasses } from '../../helpers/joinClasses.helper'
import { IPropsInput } from './input.interface'
import styles from './input.module.scss'

const Input: FC<IPropsInput> = forwardRef<HTMLInputElement, IPropsInput>(({ className, error, iconLeft, iconRight, ...attributes }, ref) => {
  return (
    <div className={cx(styles['input-wrapper'], joinClasses(styles, className), error && styles['input-wrapper-error'],  attributes.type === 'checkbox' && styles['input-wrapper-no_border'])}>
      {iconLeft}
      <input className={cx(styles.input)} ref={ref} {...attributes} />
      {iconRight}
    </div>
  )
})

export default Input