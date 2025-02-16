import React, { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '..'
import { pageConfig } from '../../config/pages.config'
import { menuItemData } from '../../constants'
import { ERoles } from '../../enums/roles.enum'
import { checkRole } from '../../helpers'
import { useAuthStore } from '../../store/auth'
import './navbar.scss'
import Profile from './profile/Profile'

export const NavBar: FC = () => {
	const userAuthStore = useAuthStore()
	const user = userAuthStore.authUser

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
						<Link to={pageConfig.statistics}>
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
								{menuItemData.map(menu => (
									<React.Fragment key={menu.url}>
										{menu?.submenu ? (
											<li>
												<details>
													<summary>{menu.title}</summary>
													<ul className='flex flex-col gap-1'>
														{menu?.submenu.map(subMenu => (
															<li key={subMenu.url}>
																<Link to={subMenu.url}>{subMenu.title}</Link>
															</li>
														))}
													</ul>
												</details>
											</li>
										) : (
											<li>
												<Link to={menu.url}>{menu.title}</Link>
											</li>
										)}
									</React.Fragment>
								))}
							</ul>
						</details>
					</li>
					<li>
						<Link to={pageConfig.completedWorks}>
							<Icon id='note-done' />
							Выполненные работы
						</Link>
					</li>
					{checkRole(user, [ERoles.Admin]) && (
						<li>
							<Link to={pageConfig.users}>
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
						<Profile user={user} />
					</ul>
				</nav>
			)}
		</div>
	)
}
