import cx from 'classnames'
import { type FC } from 'react'
import { ValidationMessage } from '..'
import { ISelectWrapperProps } from './selectWrapper.interface'
import styles from './selectWrapper.module.scss'

export const SelectWrapper: FC<ISelectWrapperProps> = ({children, label, classLabel, errorMessage, mandatory}) => {
	return (
		<div className={styles['select-wrapper']}>
			<label htmlFor="label" className={cx('label', classLabel)}>
				<span className="label__text">
					{label}
					{mandatory && (
						<span className='text-mandatory'>*</span>
					)}
				</span>
			</label>
			{children}
			{errorMessage && <ValidationMessage className='error-bottom-23' children={errorMessage} />}
		</div>
	)
}
