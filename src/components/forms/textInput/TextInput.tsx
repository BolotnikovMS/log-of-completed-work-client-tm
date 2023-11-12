import './text-input.scss'

import { Input, ValidationMessage } from '../..'

import { IPropsTextInput } from './textInput.interface'
import React from 'react'
import cx from 'classnames'

export const TextInput: React.FC<IPropsTextInput> = ({
  register,
  validation = {},
  error,
  name,
  label,
  className,
  ...attributes
}) => {   
  return (
    <>
      <label htmlFor={name}>
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
