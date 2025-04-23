import { memo, useCallback, useState, type FC } from 'react'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useChannel, useDeleteChannel, useModal } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'
import { ChannelForm } from '../../../../../channel/components'

const ChannelControlMenu: FC<{ channelId: number }> = memo(({ channelId }) => {
	const { authUser } = useAuthStore()
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteChannel } = useDeleteChannel()
	const { data, error, isLoading, isError } = useChannel(channelId, {
		enabled: isModal,
	})

	const handleDelete = useCallback((id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteChannel.mutate(id)
	}, [deleteChannel])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent =
		isLoading ?
			(<Loader />) :
			isError ?
				(<Error error={error} />) :
				<ChannelForm
					data={data}
					toggleModal={toggleModal}
					isEdited={isEdited}
					setIsEdited={setIsEdited}
				/>

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
					<Button className='mBtn_error !justify-start' onClick={() => handleDelete(channelId)}>
						<Icon id='delete' />
						Удалить
					</Button>
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

export default ChannelControlMenu
