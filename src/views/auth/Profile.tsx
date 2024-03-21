import { type FC } from 'react'
import { useAuthStore } from '../../store/auth'

const Profile: FC = () => {
	const { authUser } = useAuthStore()

	return (
		<div>
			<div className="profile__content">
				<p>
					Ф.И.О: { authUser?.fullName }
				</p>
				<p>
					Должность: { authUser?.role.name }
				</p>
				<p>
					Email: { authUser?.email }
				</p>
			</div>
		</div>
	)
}

export default Profile