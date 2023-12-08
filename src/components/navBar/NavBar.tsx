import './navbar.scss'

import { MenuItems } from './MenuItems'
import React from 'react'
import { menuItemData } from '../../constants'

export const NavBar: React.FC = () => {

  return (
    <nav className='nav'>
      <ul className='menus'>
        {
          menuItemData.map((menu, i) => <MenuItems key={i} title={menu.title} url={menu.url} submenus={menu.submenu} />)
        }
      </ul>
    </nav>
  )
}
