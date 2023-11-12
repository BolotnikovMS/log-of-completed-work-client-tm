import './textarea.scss'

import { IPropsTextarea } from './textarea.interface'
import React from 'react'
import { ValidationMessage } from '../..'
import cx from 'classnames'

export const Textarea: React.FC<IPropsTextarea> = ({
  register,
  validation,
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
      <textarea 
        {...register(name, validation)}
        id={name}
        className={cx('form__textarea', className, error && 'form__textarea-error' )}
        aria-invalid={Boolean(error)}
        {...attributes}
      ></textarea>
      {error && <ValidationMessage children={error} />}
    </>
  )
}
