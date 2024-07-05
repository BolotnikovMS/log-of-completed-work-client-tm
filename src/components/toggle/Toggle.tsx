import { forwardRef, type FC } from 'react'
import styles from './toggle.module.scss'
import { IPropsToggle } from './toggle.interface'

const Toggle: FC<IPropsToggle> = forwardRef<HTMLInputElement, IPropsToggle>(({ idToggle, ...attributes }, ref) => {
  return (
    <div className={styles.toggleContainer}>
      <input type="checkbox" id={idToggle} className={styles.toggleInput} ref={ref} {...attributes} />
      <label htmlFor={idToggle} className={styles.toggleLabel}></label>
    </div>
  )
})

export default Toggle
