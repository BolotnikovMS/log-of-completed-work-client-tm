import { memo, useCallback, useState, type FC } from 'react'
import { ChannelEquipmentForm } from '../../..'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useChannelEquipment, useDeleteChannelEquipment, useModal } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'

const ChannelEquipmentControlMenu: FC<{ channelEquipmentId: number }> = memo(({ channelEquipmentId }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteChannelEquipment } = useDeleteChannelEquipment()
	const { data, error, isError, isLoading } = useChannelEquipment(channelEquipmentId, {
		enabled: isModal
	})
	const handleDelete = useCallback((id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteChannelEquipment.mutate(id)
	}, [deleteChannelEquipment])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent =
		isLoading ?
			<Loader /> :
			isError ?
				<Error error={error} /> :
				<ChannelEquipmentForm
					data={data}
					isEdited={isEdited}
					setIsEdited={setIsEdited}
					toggleModal={toggleModal}
				/>

	if (!isAdminOrModerator) return null

	return (
		<>
			<Dropdown
				children={<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />}
				tooltipText='Меню'
				classBtnTrigger='btn-circle'
				menuItems={[
					isAdminOrModerator && (
						<Button className='!justify-start' onClick={handleEdit}>
							<Icon id='edit' />
							Редактировать
						</Button>
					),
					isAdmin && (
						<Button className='mBtn_error !justify-start' onClick={() => handleDelete(channelEquipmentId)}>
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
				content={modalContent}
			/>
		</>
	)
})

export default ChannelEquipmentControlMenu
