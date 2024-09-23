import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from '..'
import { menuItemData } from '../../constants'
import { ERoles } from '../../enums/roles.enum'
import { checkRole } from '../../helpers'
import { useLogout } from '../../hooks'
import { useAuthStore } from '../../store/auth'
import './navbar.scss'

export const NavBar: FC = () => {
  const userAuthStore = useAuthStore()
  const user = userAuthStore.authUser
  const { logout } = useLogout()
  const logoutHandel = () => logout.mutate()

  return (
    <div className='mNavBar'>
      <nav className='mNavBar__nav'>
        <div className='mNavBar__logo '>
          {/*<Group className='!flex-row !items-center'>
            <Icon id='logo-be' className='!w-12 !h-12 !z-30' />
            <span className='text-2xl font-bold text-sky-500'>ПО "ИТиС"</span>
          </Group>*/}
          <span className='text-content text-center'>
            Журнал выполненных работ по ТМ
          </span>
        </div>
        <ul className='mNavBar__menu'>
          <li>
            <Link to={'/'}>
              <Icon id='pie-chart' />
              Статистика
            </Link>
          </li>
          <li>
            <details>
              <summary>
                <Icon id='books' />
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
              <Icon id='note-done' />
              Выполненные работы
            </Link>
          </li>
          {checkRole(user, [ERoles.Admin]) && (
            <li>
              <Link to={'/users'}>
                <Icon id='users' />
                Пользователи
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user && (
        <nav className='mNavBar__nav'>
          <ul className='mNavBar__menu !gap-2'>
            <div className='flex items-center gap-3'>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span>
                    <Icon id='user' className='!w-7 !h-7' />
                  </span>
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
                <Icon id='profile' />
                Профиль
              </Link>
            </li>
            <Button className='btn-error mt-5' onClick={logoutHandel}>
              <Icon id='logout' />
              Выход
            </Button>
          </ul>
        </nav>
      )}
    </div>
  )
}
