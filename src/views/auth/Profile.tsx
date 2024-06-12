import { type FC } from 'react'
import { useAuthStore } from '../../store/auth'
import styles from './profile.module.scss'

const Profile: FC = () => {
	const { authUser } = useAuthStore()

	return (
		<div>
			<div className={styles['profile-content']}>
				<p className='text'>
					Ф.И.О: 
					<span className="sub-text">
						{ authUser?.fullName }
					</span>
				</p>
				<p className='text'>
					Должность: 
					<span className="sub-text">
						{ authUser?.position }
					</span>
				</p>
				<p className='text'>
					Роль в системе: 
					<span className="sub-text">
						{ authUser?.role.name }
					</span>
				</p>
				<p className='text'>
					Email: 
					<span className="sub-text">
						{ authUser?.email }
					</span>
				</p>
			</div>
		</div>
	)
}

export default Profile