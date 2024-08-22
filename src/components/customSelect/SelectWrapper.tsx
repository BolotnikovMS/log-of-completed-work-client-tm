import cx from 'classnames'
import { type FC } from 'react'
import { ValidationMessage } from '..'
import { ISelectWrapperProps } from './selectWrapper.interface'

export const SelectWrapper: FC<ISelectWrapperProps> = ({ children, label, classLabel, errorMessage, mandatory }) => {
  return (
    <div className='relative flex flex-col gap-1'>
      <label htmlFor="label" className={cx('label items-start', classLabel)}>
        <span className="label__text">
          {label}
          {mandatory && (
            <span className='text-mandatory'>*</span>
          )}
        </span>
      </label>
      {children}
      {errorMessage && <ValidationMessage className='bottom-[-27px]' children={errorMessage} />}
    </div>
  )
}
