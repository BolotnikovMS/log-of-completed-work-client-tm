import cx from 'classnames'
import { type FC } from 'react'
import { IPropsGroup } from './group.interface'
import styles from './group.module.scss'

const Group: FC<IPropsGroup> = ({ className, children, ...attributes}) => {
	return (
		<div className={cx(styles.group, className && styles[className])} {...attributes}>
			{children}
		</div>
	)
}

export default Group