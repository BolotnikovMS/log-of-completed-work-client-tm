import './../customInput/custom-input.scss'
import styles from './textarea.module.scss'

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
      <label htmlFor={name} className='label'>
        {label}
      </label>
      <textarea 
        {...register(name, validation)}
        id={name}
        className={cx(styles.textarea, className, error && styles['textarea-error'] )}
        aria-invalid={Boolean(error)}
        {...attributes}
      ></textarea>
      {error && <ValidationMessage children={error} />}
    </>
  )
}

export default Textarea