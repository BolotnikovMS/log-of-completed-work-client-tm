import cx from 'classnames'
import { type FC } from 'react'
import { ValidationMessage } from '..'
import { IPropsCheckbox } from './checkbox.interface'

const Checkbox: FC<IPropsCheckbox> = ({ classLabel, textLabel, classLabelText, classInput, mandatory, register, validation, errorMessage, ...attributes }) => {
	return (
		<div className="relative">
			<label className={cx('label cursor-pointer flex-row', classLabel)}>
				<span className={cx('label__text text-lg', classLabelText)}>
					{textLabel}
					{mandatory && <span className='text-mandatory'>*</span>}
				</span>
				<input
					type="checkbox"
					className={cx('checkbox checkbox-sm', classInput)}
					{...attributes}
					{...register && register(attributes.name, validation)}
				/>
			</label>
			{errorMessage && 
				<ValidationMessage
					className='bottom-[-27px]'
					children={errorMessage}
				/>
			}
		</div>
	)
}

export default Checkbox