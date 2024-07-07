import { useEffect, useRef, useState } from 'react'

import { Button } from '..'
import { IPropsDropdown } from './dropdown.interface'
import styles from './dropdown.module.scss'

const Dropdown = ({ children, menuItems }: IPropsDropdown) => {
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
    <div className={styles.dropdown} ref={dropdown}>
      <Button classBtn={styles.dropdownTriggerBtn} onClick={handelDropdownClick}>
        {children}
      </Button>
      { dropdownState ? (
        <ul className={styles.dropdownMenu}>
          {
            menuItems.map((item, i) => (
              <li key={i}>
                {item}
              </li>
            ))
          }
        </ul>
      ) : null }
    </div>
  )
}

export default Dropdown