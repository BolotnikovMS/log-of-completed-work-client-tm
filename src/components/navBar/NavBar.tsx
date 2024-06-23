import './navbar.scss'

import { CircleUserRound, LogIn, LogOut } from 'lucide-react'

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '..'
import { menuItemData } from '../../constants'
import { ERoles } from '../../enums/roles.enum'
import { checkRole } from '../../helpers/checkRole.helper'
import { useLogout } from '../../hooks'
import { useAuthStore } from '../../store/auth'
import { MenuItems } from './MenuItems'

export const NavBar: React.FC = () => {
	const userAuthStore = useAuthStore()
	const user = userAuthStore.authUser
	const { logout } = useLogout()
	const logoutHandel = () => logout.mutate()

  return (
    <nav className='nav'>
      <ul className='menus'>
        {
					user && (
					menuItemData.map((menu, i) => <MenuItems key={i} title={menu.title} url={menu.url} submenus={menu.submenu} />)
					)
        }
				{
					checkRole(user, [ERoles.Admin]) && (
						<li className="menu__item">
							<Link to={'/users'}>
								Пользователи
							</Link>
						</li>
					)
				}
				{
					!user && (
						<li className='menu__item'>
							<Link to={'/sign-in'}>
								<LogIn />
								Вход
							</Link>
						</li>
					)
				}
				{
					user && (
						<>
							<li className="menu__item">
								<Link to={'/profile'}>
									<CircleUserRound />
									Профиль
								</Link>
							</li>
							<li className='menu__item'>
								<Button onClick={logoutHandel} classBtn='btn-nav-bar'>
									<LogOut width={18} />
									Выход
								</Button>
							</li>
						</>
					)
				}
      </ul>
    </nav>
  )
}
