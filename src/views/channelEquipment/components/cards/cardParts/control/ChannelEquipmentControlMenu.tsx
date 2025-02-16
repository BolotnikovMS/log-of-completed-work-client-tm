import { memo, useCallback, useState, type FC } from 'react'
import { ChannelEquipmentForm } from '../../..'
import { Button, Dropdown, Icon, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteChannelEquipment, useModal } from '../../../../../../hooks'
import { IChannelEquipment } from '../../../../../../interfaces'
import { useAuthStore } from '../../../../../../store/auth'

interface IPropsChannelEquipmentControlMenu {
	channelEquipment: IChannelEquipment
}

const ChannelEquipmentControlMenu: FC<IPropsChannelEquipmentControlMenu> = memo(({ channelEquipment }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteChannelEquipment } = useDeleteChannelEquipment()
	const handleDelete = useCallback((id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteChannelEquipment.mutate(id)
	}, [deleteChannelEquipment])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])

	return (
		<>
			{checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
				<>
					<Dropdown
						children={<Icon id='setting' />}
						classBtnTrigger='btn-circle'
						menuItems={[
							isAdminOrModerator && (
								<Button className='!justify-start' onClick={handleEdit}>
									<Icon id='edit' />
									Редактировать
								</Button>
							),
							isAdmin && (
								<Button className='mBtn_error !justify-start' onClick={() => handleDelete(channelEquipment.id)}>
									<Icon id='delete' />
									Удалить
								</Button>
							)
						]}
					/>
					<Modal
						visible={isModal}
						title='Редактирование записи'
						onToggle={() => { toggleModal(), setIsEdited(false) }}
						content={<ChannelEquipmentForm data={channelEquipment} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}
					/>

				</>
			)}
		</>
	)
})

export default ChannelEquipmentControlMenu
