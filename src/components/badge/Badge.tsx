import cx from 'classnames'
import { HTMLAttributes, type FC } from 'react'
import './bage.css'

interface IPropsBadge extends HTMLAttributes<HTMLDivElement> {
  text: string | number
}

const Badge: FC<IPropsBadge> = ({ text, className }) => {
  return (
    <div className={cx('badge', className)}>{text}</div>
  )
}

export default Badge
