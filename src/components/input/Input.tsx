import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { IPropsInput } from './input.interface'
import './input.scss'

const Input: FC<IPropsInput> = forwardRef<HTMLInputElement, IPropsInput>(({ className, error, iconLeft, iconRight, ...attributes }, ref) => {
  return (
    <div className={cx('input-wrapper', error && 'border-red-500', attributes.type === 'checkbox' &&
      '!border-none')}>
      {iconLeft}
      <input className='w-full' ref={ref} {...attributes} />
      {iconRight}
    </div>
  )
})

export default Input
