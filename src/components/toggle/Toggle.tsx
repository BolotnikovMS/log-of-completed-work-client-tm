import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { IPropsToggle } from './toggle.interface'

const Toggle: FC<IPropsToggle> = forwardRef<HTMLInputElement, IPropsToggle>(({ idToggle, className, ...attributes }, ref) => {
  return (
    <input id={idToggle} type="checkbox" className={cx('toggle', className)} ref={ref} {...attributes} />
  )
})

export default Toggle
