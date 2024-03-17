import './navbar.scss'

import React from 'react'
import { Button } from '..'
import { menuItemData } from '../../constants'
import { useLogout } from '../../hooks'
import { MenuItems } from './MenuItems'

export const NavBar: React.FC = () => {
	const { logout } = useLogout()
	const logoutHandel = () => logout.mutate()

  return (
    <nav className='nav'>
      <ul className='menus'>
        {
          menuItemData.map((menu, i) => <MenuItems key={i} title={menu.title} url={menu.url} submenus={menu.submenu} />)
        }
				<li>
					<Button onClick={logoutHandel}>
						Выход
					</Button>
				</li>
      </ul>
    </nav>
  )
}
