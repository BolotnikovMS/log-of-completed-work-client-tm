import { useCallback, useState, type FC } from 'react'
import { Button, Dropdown, Icon } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteTelemechanicsDevice, useModal } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'

const TelemechanicDeviceMenu: FC<{deviceId: number}> = ({deviceId}) => {
	const { authUser} = useAuthStore()
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteTelemechanicsDevice } = useDeleteTelemechanicsDevice()

	const handleDelete = useCallback((id: number) => {
		const answer = confirm('Подтвердите удаление записи.')
	
		if (!answer) return null
	
		return deleteTelemechanicsDevice.mutate(id)
	}, [deleteTelemechanicsDevice])
	
	if (!isAdminOrModerator) return null
		
	return (
		<>
			<Dropdown
				children={<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />}
				tooltipText='Меню'
				classBtnTrigger='btn-circle'
				menuItems={[
					<Button className='mBtn_error !justify-start' onClick={() => handleDelete(deviceId)}>
						<Icon id='delete' />
						Удалить
					</Button>
				]}
			/>
		</>
	)
}

export default TelemechanicDeviceMenu