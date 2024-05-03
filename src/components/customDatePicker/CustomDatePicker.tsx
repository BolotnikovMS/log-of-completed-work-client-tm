import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { default as DatePicker } from 'react-datepicker'
import { ValidationMessage } from '..'
import { IPropsCustomDatePicker } from './customDatePicker.interface'
import styles from './customDatePicker.module.scss'

const CustomDatePicker: FC<IPropsCustomDatePicker> = forwardRef<unknown, IPropsCustomDatePicker>(({className, errorMessage, iconLeft, iconRight, ...props}, ref) => {
	return (
		<>
			<div className={cx(styles['date-picker-wrapper'], className, errorMessage && styles['date-picker-wrapper-error'])}>
				{iconLeft}
				<DatePicker
					className={styles['date-picker-input']}
					ref={ref}
					{...props}
				/>
				{iconRight}
				{errorMessage && <ValidationMessage className='error-bottom-23' children={errorMessage} />}
			</div>
		</>
	)
})

export default CustomDatePicker