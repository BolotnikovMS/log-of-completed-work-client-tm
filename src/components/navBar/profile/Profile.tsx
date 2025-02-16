import { memo, useCallback, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, ToggleTheme } from '../..'
import { pageConfig } from '../../../config/pages.config'
import { useLogout } from '../../../hooks'
import Icon from '../../icon/Icon'
import Avatar from './avatar/Avatar'
import { IPropsProfile } from './profile.interface'
import UserInfo from './userInfo/UserInfo'

const Profile: FC<IPropsProfile> = memo(({ user }) => {
	const { logout } = useLogout()
	const logoutHandler = useCallback(() => logout.mutate(), [logout])

	return (
		<div className='flex items-center justify-between gap-1'>
			<div className="flex items-center gap-2">
				<Avatar />
				<UserInfo shortName={user.shortName} position={user.position} />
			</div>
			<Dropdown
				children={<Icon id='profile' />}
				classMenu='dropdown-top dropdown-end'
				menuItems={[
					<div className='flex justify-center'>
						<ToggleTheme />
					</div>,
					<Link
						to={pageConfig.profile}
						className="flex items-center gap-2"
					>
						<Icon id='profile' />
						Профиль
					</Link>,
					<Button
						className='mBtn_error mt-4'
						onClick={logoutHandler}
						aria-label="Выйти из системы"
					>
						<Icon id='logout' className='!w-3 !h-3' />
						Выход
					</Button>
				]}
			/>
		</div>
	)
})

export default Profile
