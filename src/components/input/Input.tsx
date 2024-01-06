import './input.scss'

import { forwardRef, type FC } from 'react'

import cx from 'classnames'
import { IPropsInput } from './input.interface'

const Input: FC<IPropsInput> = forwardRef<HTMLInputElement, IPropsInput>(({ className, ...attributes }, ref ) => { 
  return (
    <input className={cx('input', className)} ref={ref} {...attributes} />
  )
})

export default Input