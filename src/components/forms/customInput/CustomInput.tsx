import './custom-input.scss'

import { Input, ValidationMessage } from '../..'

import { IPropsCustomInput } from './customInput.interface'
import React from 'react'
import cx from 'classnames'

export const CustomInput: React.FC<IPropsCustomInput> = ({
  register,
  validation = {},
  error,
  name,
  label,
  className,
  classLabel,
  ...attributes
}) => {   
  return (
    <>
      <label htmlFor={name} className={cx('label', classLabel)}>
        {label}
      </label>
      <Input
        {...register(name, validation)}
        id={name}
        type='text'
        className={cx('form__input', className, error && 'form__input-error')}
        aria-invalid={Boolean(error)}
        {...attributes}
      />
      {error && <ValidationMessage children={error} />}
    </>
  )
}
