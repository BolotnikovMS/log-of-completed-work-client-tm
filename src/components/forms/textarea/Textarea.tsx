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
	mandatory,
  ...attributes
}) => {
  return (
    <div className={styles['textarea-wrapper']}>
      <label htmlFor={name} className='label'>
				<span className="label__text">
					{label}
					{mandatory && (<span className='text-mandatory'>*</span>)}
				</span>
      </label>
      <textarea 
        {...register(name, validation)}
        id={name}
        className={cx(styles.textarea, className, error && styles['textarea-error'] )}
        aria-invalid={Boolean(error)}
        {...attributes}
      ></textarea>
			{
				error && (
					<ValidationMessage className='error-bottom-25' children={error} />
				)
			}
    </div>
  )
}

export default Textarea