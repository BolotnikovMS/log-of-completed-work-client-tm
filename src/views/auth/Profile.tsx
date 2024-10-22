import { type FC } from 'react'
import { useAuthStore } from '../../store/auth'
import './profile.scss'

const Profile: FC = () => {
  const { authUser } = useAuthStore()

  return (
    <>
      <div className='flex flex-col gap-1'>
        <p className='profile__text'>
          Ф.И.О:
          <span className="text-content">
            {authUser?.fullName}
          </span>
        </p>
        <p className='profile__text'>
          Должность:
          <span className="text-content">
            {authUser?.position}
          </span>
        </p>
        <p className='profile__text'>
          Роль в системе:
          <span className="text-content">
            {authUser?.role?.name ?? <span className='text-red-600'>Ошибка при получений роли</span>}
          </span>
        </p>
        <p className='profile__text'>
          Email:
          <span className="text-content">
            {authUser?.email}
          </span>
        </p>
      </div>
    </>
  )
}

export default Profile
