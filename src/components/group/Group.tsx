import cx from 'classnames'
import { type FC } from 'react'
import { IPropsGroup } from './group.interface'
import styles from './group.module.scss'

const Group: FC<IPropsGroup> = ({ className, children, ...attributes}) => {
	const cls = className?.split(' ')?.map(cl => styles[cl])

	return (
		<div className={cx(styles.group, cls)} {...attributes}>
			{children}
		</div>
	)
}

export default Group