import './custom-input.scss'

import { Input, ValidationMessage } from '../..'

import cx from 'classnames'
import { type FC } from 'react'
import { IPropsCustomInput } from './customInput.interface'

const CustomInput: FC<IPropsCustomInput> = ({
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
      <div className="input__group">
        <Input
          {...register(name, validation)}
          id={name}
          type='text'
          className={cx('form__input', className)}
					error={Boolean(error)}
          aria-invalid={Boolean(error)}
          {...attributes}
        />
        {error && <ValidationMessage children={error} />}
      </div>
    </>
  )
}

export default CustomInput