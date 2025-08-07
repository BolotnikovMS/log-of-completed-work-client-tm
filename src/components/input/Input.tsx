import cx from 'classnames'
import { forwardRef, type FC } from 'react'
import { ValidationMessage } from '..'
import { IPropsInput } from './input.interface'
import './input.scss'

const Input: FC<IPropsInput> = forwardRef<HTMLInputElement, IPropsInput>(({ classInput, classWrapper, classLabel, iconLeft, iconRight, label, register, validation, errorMessage, name, mandatory, ...attributes }, ref) => {
	return (
		<div className={cx('mInput-wrapper', classWrapper)}>
			{label && (
				<label htmlFor={name} className={cx('label', classLabel)}>
					<span className='label__text'>
						{label}
						{mandatory && <span className='text-mandatory'>*</span>}
					</span>
				</label>
			)}
			<div
				className={cx('mInput',
					classInput,
					errorMessage && '!border-red-500',
					attributes.type === 'checkbox' &&
					'!border-none')}
				aria-invalid={Boolean(errorMessage)}
			>
				{iconLeft}
				<input
					id={name}
					name={name}
					className='w-full bg-transparent placeholder:text-gray-400'
					ref={ref}
					{...attributes}
					{...register && register(name, validation)}
				/>
				{iconRight}
			</div>
			{errorMessage && <ValidationMessage className='bottom-[-27px]' children={errorMessage} />}
		</div>
	)
})

export default Input
