import cx from 'classnames'
import { type FC } from 'react'
import { IPropsCheckbox } from './checkbox.interface'

const Checkbox: FC<IPropsCheckbox> = ({ classLabel, textLabel, classLabelText, classInput, mandatory, ...attributes }) => {
	return (
		<label className={cx('label cursor-pointer', classLabel)}>
			<span className={cx('label__text', classLabelText)}>
				{textLabel}
				{mandatory && <span className='text-mandatory'>*</span>}
			</span>
			<input
				type="checkbox"
				className={cx('checkbox checked:!', classInput)}
				{...attributes}
			/>
		</label>
	)
}

export default Checkbox