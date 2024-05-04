import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { default as AsyncSelect, default as ReactStateManagerProps } from 'react-select'
import { ValidationMessage } from '..'
import styles from './customAsyncSelect.module.scss'

interface IPropsCustomAsyncSelect extends ReactStateManagerProps {
	className?: string
	classLabel?: string
	labelText?: string
	errorMessage?: string
	register: any
	validation?: { [key: string]: unknown }
}

export const CustomAsyncSelect: FC<IPropsCustomAsyncSelect> = forwardRef<unknown, IPropsCustomAsyncSelect>(({className, classLabel, errorMessage, register, validation, labelText, name, ...props}, ref) => {
	return (
		<div className={styles['select-wrapper']}>
			{
				labelText && (
					<label htmlFor={name} className={cx('label', classLabel)}>{labelText}</label>
				)
			}
			<AsyncSelect
				{...register(name, validation)}
				id={name}
				classNamePrefix={className}
				ref={ref}
				{...props}
			/>
			{errorMessage && <ValidationMessage children={errorMessage} />}
		</div>
	)
})
