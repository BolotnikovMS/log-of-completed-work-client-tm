import cx from 'classnames'
import { type FC } from 'react'
import { IPropsGroup } from './group.interface'
import './group.scss'

export const Group: FC<IPropsGroup> = ({ className, children, ...attributes }) => {
  return (
    <div className={cx('group', className)} {...attributes}>
      {children}
    </div>
  )
}
