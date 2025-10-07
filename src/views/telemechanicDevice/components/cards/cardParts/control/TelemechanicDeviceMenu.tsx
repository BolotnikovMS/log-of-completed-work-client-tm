import { useCallback, useState, type FC } from 'react'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteTelemechanicsDevice, useModal, useTelemechanicsDevice } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'
import TelemechanicDeviceForm from '../../../form/TelemechanicDeviceForm'

const TelemechanicDeviceMenu: FC<{ deviceId: number }> = ({ deviceId }) => {
	const { authUser } = useAuthStore()
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteTelemechanicsDevice } = useDeleteTelemechanicsDevice()
	const { data, error, isLoading, isError } = useTelemechanicsDevice(deviceId, {
		enabled: isModal
	})

	const handleDelete = useCallback((id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteTelemechanicsDevice.mutate(id)
	}, [deleteTelemechanicsDevice])

	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent = isLoading ? (
		<Loader />
	) : isError ? (
		<Error error={error} />
	) : (
		<TelemechanicDeviceForm data={data} toggleModal={toggleModal} isEdited={isEdited} setIsEdited={setIsEdited} />
	)

	if (!isAdminOrModerator) return null

	return (
		<>
			<Dropdown
				children={<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />}
				tooltipText='Меню'
				classBtnTrigger='btn-circle'
				menuItems={[
					<Button className='!justify-start' onClick={handleEdit}>
						<Icon id='edit' />
						Редактировать
					</Button>,
					<Button className='mBtn_error !justify-start' onClick={() => handleDelete(deviceId)}>
						<Icon id='delete' />
						Удалить
					</Button>
				]}
			/>
			<Modal
				visible={isModal}
				title='Редактирование записи'
				onToggle={() => {
					(toggleModal(), setIsEdited(false))
				}}
				content={modalContent}
			/>
		</>
	)
}

export default TelemechanicDeviceMenu
