import './badge.scss'

import React from 'react'
import cx from 'classnames'

interface IPropsBadge {
  text: string | number
  className?: string
}

export const Badge: React.FC<IPropsBadge> = ({ text, className }) => {
  return (
    <span className={cx('badge', className)}>{text}</span>
  )
}
