import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '..'
import { menuItemData } from '../../constants'
import { ERoles } from '../../enums/roles.enum'
import { checkRole } from '../../helpers/checkRole.helper'
import { useLogout } from '../../hooks'
import { Login, Logout, Profile } from '../../icons'
import { useAuthStore } from '../../store/auth'
import { MenuItems } from './MenuItems'
import './navbar.scss'

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
        <li className='menu__item'>
          <Link to={'/completed-works'}>
            Выполненные работы
          </Link>
        </li>
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
                <Login className='icon' />
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
                  <Profile className='icon' />
                  Профиль
                </Link>
              </li>
              <li className='menu__item'>
                <Button onClick={logoutHandel} classBtn='btn-nav-bar'>
                  <Logout className='icon' />
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
