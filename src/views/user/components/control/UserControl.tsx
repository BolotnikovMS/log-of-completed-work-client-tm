import { type FC } from 'react'
import { UserForm } from '..'
import { Button, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { Add } from '../../../../icons'
import { useAuthStore } from '../../../../store/auth'

const UserControl: FC = () => {
	const { authUser } = useAuthStore()
  const { isModal, toggleModal } = useModal()

	return (
		<div className="work-log__control">
			{
				checkRole(authUser, [ERoles.Admin]) && (
					<Button classBtn='btn-bg_green' onClick={toggleModal}>
						<Add className='icon' />
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
