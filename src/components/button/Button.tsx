import cx from 'classnames'
import { type FC } from 'react'
import { IPropsButton } from './button.interface'
import './button.scss'

export const Button: FC<IPropsButton> = ({ children, className, ...attributes }) => {
  return (
    <button className={cx('mBtn', className, attributes.disabled && 'btn-disabled')} {...attributes}>
      {children}
    </button>
  )
}
