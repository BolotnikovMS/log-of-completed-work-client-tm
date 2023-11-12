import './button.scss'

import { IPropsButton } from './button.interface'
import React from 'react'
import cx from 'classnames'

export const Button: React.FC<IPropsButton> = ({ children, classBtn, ...attributes }) => {  
  return (
    <button className={cx('btn', classBtn, attributes.disabled && 'btn-disabled')} {...attributes}>
      {children}
    </button>
  )
}
