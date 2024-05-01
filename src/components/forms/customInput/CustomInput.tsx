import './custom-input.scss'

import { Input, ValidationMessage } from '../..'

import cx from 'classnames'
import { type FC } from 'react'
import { IPropsCustomInput } from './customInput.interface'

const CustomInput: FC<IPropsCustomInput> = ({
  register,
  validation = {},
  errorMessage,
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
        className={cx(className)}
        error={Boolean(errorMessage)}
        aria-invalid={Boolean(errorMessage)}
        {...attributes}
      />
      {errorMessage && <ValidationMessage children={errorMessage} />}
    </>
  )
}

export default CustomInput