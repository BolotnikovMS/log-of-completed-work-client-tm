import './dropdown.scss'

import { ISubmenu } from './menu-item.interface'
import { Link } from 'react-router-dom'
import React from 'react'
import cx from 'classnames'

interface IPropsDropdown extends ISubmenu {
  dropdown: boolean
}

export const DropdownMenu: React.FC<IPropsDropdown> = ({submenus, dropdown}) => {
  return (
    <ul className={cx('dropdown', dropdown ? 'show' : '')}>
      {submenus?.map((submenu, i) => (
        <li key={i} className='menu__item'>
          <Link to={submenu.url}>{submenu.title}</Link>
        </li>
      ))}
    </ul>
  )
}
