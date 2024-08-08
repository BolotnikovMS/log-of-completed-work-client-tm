import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Button } from '..'
import { joinClasses } from '../../helpers'
import { IPropsDropdown } from './dropdown.interface'
import styles from './dropdown.module.scss'

const Dropdown = ({ children, menuItems, classMenu }: IPropsDropdown) => {
  const [dropdownState, setDropdownState] = useState<boolean>(false)
  const dropdown = useRef<HTMLDivElement | null>(null)

  const handelDropdownClick = () => {
    setDropdownState(!dropdownState)
  }

  const handleClickOutside = ({ target }: MouseEvent | TouchEvent): void => {
    if (target instanceof Node && dropdown.current && !dropdown.current.contains(target)) {
      setDropdownState(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdown}>
      <Button classBtn={styles.dropdownTriggerBtn} onClick={handelDropdownClick}>
        {children}
      </Button>
      {dropdownState ? (
        <div className={styles.dropdownContent}>
          <ul className={cx(styles.dropdownMenu, joinClasses(styles, classMenu))}>
            {menuItems.map((item, i) => (
              item && (
                <li key={i}>
                  {item}
                </li>)
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown
