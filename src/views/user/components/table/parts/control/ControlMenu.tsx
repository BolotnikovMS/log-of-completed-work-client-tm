import { type FC } from 'react'
import { Button, ChangePasswordForm, Dropdown, Error, Icon, Loader, Modal } from '../../../../../../components'
import { useModal, useUser } from '../../../../../../hooks'
import ChangeUserRole from '../../../form/changeUserRole/ChangeUserRole'

const ControlMenu: FC<{ userId: number }> = ({ userId }) => {
	const { isModal: isModalChangeRole, toggleModal: toggleModalChangeRole } = useModal()
	const { isModal: isModalChangePassword, toggleModal: toggleModalChangePassword } = useModal()
	const { data: user, error, isError, isFetching } = useUser(userId, {
		enabled: isModalChangeRole
	})

	const modalContent =
		isFetching ? <Loader /> :
			isError ? <Error error={error} /> :
				isModalChangeRole ? <ChangeUserRole data={user} toggleModal={toggleModalChangeRole} /> :
					isModalChangePassword ? <ChangePasswordForm user={user} isResetPassword toggleModal={toggleModalChangePassword} /> :
						null

	return (
		<>
			<Dropdown
				children={<Icon id="setting" />}
				classBtnTrigger='btn-circle'
				menuItems={[
					<Button className='!justify-start' onClick={toggleModalChangeRole}>
						<Icon id='user-switch' />
						Изменить роль
					</Button>,
					<Button className='!justify-start' onClick={toggleModalChangePassword}>
						<Icon id='reset-password' />
						Изменить пароль
					</Button>,
				]}
			/>
			<Modal
				visible={isModalChangeRole}
				title='Форма изменения роли пользователя'
				onToggle={toggleModalChangeRole}
				content={modalContent}
			/>
			<Modal
				visible={isModalChangePassword}
				title='Форма изменения пароля пользователя'
				onToggle={toggleModalChangePassword}
				content={modalContent}
			/>
		</>
	)
}

export default ControlMenu
