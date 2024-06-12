import { KeyRound } from 'lucide-react'
import { type FC } from 'react'
import { ChangePasswordForm } from '../..'
import { Button, Modal } from '../../../../components'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const ProfileControl: FC = () => {
	const { authUser } = useAuthStore()
  const { isModal, toggleModal } = useModal()

	return (
		<div className='work-log__control'>
			{authUser && (
				<Button classBtn='btn-bg_blue' onClick={() => toggleModal()}>
					<KeyRound />
					Сменить пароль
				</Button>
			)}
			<Modal
        visible={isModal} 
        title='Форма смены пароля' 
        content={<ChangePasswordForm toggleModal={toggleModal} />} 
        onToggle={toggleModal} 
      />
		</div>
	)
}

export default ProfileControl