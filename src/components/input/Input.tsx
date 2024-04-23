import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { IPropsInput } from './input.interface'
import styles from './input.module.scss'

const Input: FC<IPropsInput> = forwardRef<HTMLInputElement, IPropsInput>(({ className, error, iconLeft, iconRight, ...attributes }, ref) => {
	return (
		<div className={cx(styles['input-wrapper'], error && styles['input-wrapper-error'])}>
			{iconLeft}
			<input className={cx(styles.input, className)} ref={ref} {...attributes} />
			{iconRight}
		</div>
	)
})

export default Input