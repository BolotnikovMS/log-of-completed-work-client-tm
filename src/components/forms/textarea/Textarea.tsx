import './textarea.scss'

import cx from 'classnames'
import { type FC } from 'react'
import { ValidationMessage } from '../..'
import { IPropsTextarea } from './textarea.interface'

const Textarea: FC<IPropsTextarea> = ({
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
        className={cx('form__input form__textarea', className, error && 'form__textarea-error' )}
        aria-invalid={Boolean(error)}
        {...attributes}
      ></textarea>
      {error && <ValidationMessage children={error} />}
    </>
  )
}

export default Textarea