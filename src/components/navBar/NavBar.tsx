import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '..'
import { menuItemData } from '../../constants'
import { ERoles } from '../../enums/roles.enum'
import { checkRole } from '../../helpers'
import { useLogout } from '../../hooks'
import { Books, Home, Logout, Note, NoteDone, Profile, User, Users } from '../../icons'
import { useAuthStore } from '../../store/auth'
import './navbar.scss'

export const NavBar: FC = () => {
  const userAuthStore = useAuthStore()
  const user = userAuthStore.authUser
  const { logout } = useLogout()
  const logoutHandel = () => logout.mutate()

  return (
    <div className='mNavBar'>
      <nav>
        <div className='mNavBar__logo'>
          <Note />
          <span className='text-title font-bold'>ЖВР</span>
        </div>
        <ul className='mNavBar__menu'>
          <li>
            <Link to={'/'}>
              <Home className='icon' />
              Главная
            </Link>
          </li>
          <li>
            <details>
              <summary>
                <Books className='icon' />
                Справочники
              </summary>
              <ul className='flex flex-col gap-1'>
                {menuItemData.map((menu, i) => (
                  <li key={i}>
                    <Link to={menu.url}>{menu.title}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <Link to={'/completed-works'}>
              <NoteDone className='icon' />
              Выполненные работы
            </Link>
          </li>
          {checkRole(user, [ERoles.Admin]) && (
            <li>
              <Link to={'/users'}>
                <Users className='icon' />
                Пользователи
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user && (
        <nav>
          <ul className='mNavBar__menu !gap-2'>
            <div className='flex items-center gap-3'>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span><User /></span>
                </div>
              </div>
              <div className='leading-3'>
                <p className='text-lg'>
                  {user.shortName}
                </p>
                <span className='text-[11px]'>
                  {user.position}
                </span>
              </div>
            </div>
            <li className=''>
              <Link to={'/profile'}>
                <Profile className='icon' />
                Профиль
              </Link>
            </li>
            <Button className='btn-error mt-5' onClick={logoutHandel}>
              <Logout className='icon' />
              Выход
            </Button>
          </ul>
        </nav>
      )}
    </div>
  )
}
