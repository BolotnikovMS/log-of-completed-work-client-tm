import { memo, type FC } from 'react'
import { IPropsUserInfo } from './userInfo.interface'

const UserInfo: FC<IPropsUserInfo> = memo(({ shortName, position }) => {
	return (
		<div className='leading-3'>
			<p className='text-sm font-bold' aria-label="Имя пользователя">
				{shortName}
			</p>
			<span className='text-[12px]' aria-label="Должность пользователя">
				{position}
			</span>
		</div>
	)
})

export default UserInfo
