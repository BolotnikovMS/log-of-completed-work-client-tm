import cx from 'classnames'
import { type FC } from 'react'
import { IPropsBadge } from './badge.interface'
import './bage.scss'

const Badge: FC<IPropsBadge> = ({ text, className }) => {
	return (
		<div className={cx('badge', className)}>{text}</div>
	)
}

export default Badge
