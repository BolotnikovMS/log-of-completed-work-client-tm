import { Input, ValidationMessage } from '../..'

import cx from 'classnames'
import { type FC } from 'react'
import { joinClasses } from '../../../helpers/joinClasses.helper'
import { IPropsCustomInput } from './customInput.interface'
import styles from './customInput.module.scss'

const CustomInput: FC<IPropsCustomInput> = ({
  register,
  validation = {},
  errorMessage,
  name,
  label,
  className,
  classLabel,
  mandatory,
  ...attributes
}) => {
  return (
    <div className={cx(styles['custom-input-wrapper'], joinClasses(styles, className))}>
      {label && (
        <label htmlFor={name} className={cx('label', classLabel)}>
          <span className='label__text'>
            {label}
            {mandatory && (<span className='text-mandatory'>*</span>)}
          </span>
        </label>
      )}
      <Input
        {...register(name, validation)}
        id={name}
        type='text'
        // className={cx(className)}
        error={Boolean(errorMessage)}
        aria-invalid={Boolean(errorMessage)}
        {...attributes}
      />
      {errorMessage && <ValidationMessage className='error-bottom-23' children={errorMessage} />}
    </div>
  )
}

export default CustomInput
