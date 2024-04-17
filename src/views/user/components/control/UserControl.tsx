import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { UserForm } from '..'
import { Button, Modal } from '../../../../components'
import { checkRole, ERoles } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const UserControl: FC = () => {
	const { authUser } = useAuthStore()
  const { isModal, toggleModal } = useModal()

	return (
		<div className="work-log__control">
			{
				checkRole(authUser, [ERoles.Admin]) && (
					<Button classBtn='btn-bg_green' onClick={toggleModal}>
						<Plus />
					</Button>
				)
			}
			<Modal
				visible={isModal}
				title='Форма добавления нового пользователя'
				content={<UserForm toggleModal={toggleModal} />}
				onToggle={toggleModal}
			/>
		</div>
	)
}

export default UserControl