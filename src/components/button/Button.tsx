import './button.scss'

import cx from 'classnames'
import { type FC } from 'react'
import { IPropsButton } from './button.interface'

export const Button: FC<IPropsButton> = ({ children, classBtn, ...attributes }) => {
  return (
    <button className={cx('btn', classBtn, attributes.disabled && 'btn-disabled')} {...attributes}>
      {children}
    </button>
  )
}
