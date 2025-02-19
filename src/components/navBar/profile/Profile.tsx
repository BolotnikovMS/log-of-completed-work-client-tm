import { memo, useCallback, type FC } from 'react'
import { Button, ToggleTheme, Tooltip } from '../..'
import { useLogout } from '../../../hooks'
import Icon from '../../icon/Icon'
import Avatar from './avatar/Avatar'
import { IPropsProfile } from './profile.interface'
import UserInfo from './userInfo/UserInfo'

const Profile: FC<IPropsProfile> = memo(({ user }) => {
	const { logout } = useLogout()
	const logoutHandler = useCallback(() => logout.mutate(), [logout])

	return (
		<div className='flex flex-col items-center gap-4'>
			<ToggleTheme />
			<div className="w-full flex gap-3 justify-between">
				<div className="flex items-center gap-2">
					<Avatar />
					<UserInfo shortName={user.shortName} position={user.position} />
				</div>
				<Tooltip text='Выйти из системы'>
					<Button
						className='btn-circle mBtn_error'
						onClick={logoutHandler}
						aria-label="Выйти из системы"
					>
						<Icon id='logout' />
					</Button>
				</Tooltip>
			</div>
		</div>
	)
})

export default Profile
