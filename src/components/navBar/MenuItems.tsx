import cx from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '..'
import { ChevronDown } from '../../icons'
import { DropdownMenu } from './DropdownMenu'
import { IPropsMenuItems } from './menu-item.interface'

export const MenuItems: React.FC<IPropsMenuItems> = ({ title, url, submenus }) => {
  const [dropdown, setDropdown] = useState<boolean>(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handler = ({ target }: MouseEvent): void => {
      if (dropdown && ref.current && !ref.current.contains(target as Node)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [dropdown])

  const closeDropdown = () => {
    dropdown && setDropdown(false)
  }

  return (
    <li className='menu__item' ref={ref} onClick={closeDropdown}>
      {
        submenus?.length ? (
          <>
            <Button
              aria-expanded={dropdown ? 'true' : 'false'}
              onClick={() => setDropdown((prev) => !prev)}
            >
              {title}
              {<ChevronDown className={cx('icon', dropdown && 'dropdown-drop')} />}
            </Button>
            <DropdownMenu submenus={submenus} dropdown={dropdown} />
          </>
        ) : (
          <Link to={url}>{title}</Link>
        )
      }
    </li>
  )
}
