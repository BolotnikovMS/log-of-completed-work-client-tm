import './input.scss'

import React, { forwardRef } from 'react'

import { IPropsInput } from './input.interface'
import cx from 'classnames'

export const Input: React.FC<IPropsInput> = forwardRef<HTMLInputElement, IPropsInput>(({ className, ...attributes }, ref ) => { 
  return (
    <input className={cx('input', className)} ref={ref} {...attributes} />
  )
})
