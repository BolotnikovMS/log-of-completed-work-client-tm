import './badge.scss'

import cx from 'classnames'
import { type FC } from 'react'

interface IPropsBadge {
  text: string | number
  className?: string
}

const Badge: FC<IPropsBadge> = ({ text, className }) => {
  return (
    <span className={cx('badge', className)}>{text}</span>
  )
}

export default Badge