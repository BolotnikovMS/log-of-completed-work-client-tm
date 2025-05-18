import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { default as DatePicker } from 'react-datepicker'
import { ValidationMessage } from '..'
import { IPropsCustomDatePicker } from './customDatePicker.interface'
import './customDatePicker.scss'

const CustomDatePicker: FC<IPropsCustomDatePicker> = forwardRef<null, IPropsCustomDatePicker>(({ className, errorMessage, iconLeft, iconRight, ...props }, ref) => {
	return (
		<div className={cx('date-picker-wrapper',
			className,
			errorMessage && '!border-red-500')}
		>
			{iconLeft}
			<DatePicker
				className='w-full bg-transparent placeholder:text-gray-400'
				wrapperClassName='w-full'
				ref={ref}
				{...props}
			/>
			{iconRight}
			{errorMessage && <ValidationMessage className='bottom-[-32px]' children={errorMessage} />}
		</div>
	)
})

export default CustomDatePicker
