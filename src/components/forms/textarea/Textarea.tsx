import cx from 'classnames'
import { type FC } from 'react'
import { ValidationMessage } from '../..'
import { IPropsTextarea } from './textarea.interface'
import './textarea.scss'

const Textarea: FC<IPropsTextarea> = ({
  register,
  validation,
  error,
  name,
  label,
  className,
  mandatory,
  ...attributes
}) => {
  return (
    <div className='textarea-wrapper'>
      <label htmlFor={name} className='label'>
        <span className="label__text">
          {label}
          {mandatory && <span className='text-mandatory'>*</span>}
        </span>
      </label>
      <textarea
        {...register(name, validation)}
        id={name}
        className={cx('mTextarea',
          className,
          error && '!border-red-500')}
        aria-invalid={Boolean(error)}
        {...attributes}
      ></textarea>
      {error && <ValidationMessage className='bottom-[-27px]' children={error} />}
    </div>
  )
}

export default Textarea
