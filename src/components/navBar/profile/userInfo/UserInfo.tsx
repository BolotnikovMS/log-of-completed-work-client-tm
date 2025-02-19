import { memo, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from '../../..'
import { pageConfig } from '../../../../config/pages.config'
import { IPropsUserInfo } from './userInfo.interface'

const UserInfo: FC<IPropsUserInfo> = memo(({ shortName, position }) => {
	return (
		<div className='leading-3 flex flex-col'>
			<Tooltip text='Перейти в профиль'>
				<p className='text-sm font-bold' aria-label="Имя пользователя">
					<Link to={pageConfig.profile}>
						{shortName}
					</Link>
				</p>
			</Tooltip>
			<span className='text-[12px]' aria-label="Должность пользователя">
				{position}
			</span>
		</div>
	)
})

export default UserInfo
