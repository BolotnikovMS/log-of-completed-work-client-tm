import { FC, memo, useCallback, useState } from 'react'
import { SubstationForm } from '../../..'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteSubstation, useModal, useSubstation } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'

const ControlMenu: FC<{ substationId: number }> = memo(({ substationId }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteSubstation } = useDeleteSubstation()
	const { data, error, isLoading, isError } = useSubstation(substationId, {
		enabled: isModal
	})

	const handleDelete = useCallback((id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteSubstation.mutate(id)
	}, [deleteSubstation])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent =
		isLoading ?
			<Loader /> :
			isError ?
				<Error error={error} /> :
				<SubstationForm
					data={data}
					toggleModal={toggleModal}
					isEdited={isEdited}
					setIsEdited={setIsEdited}
				/>

	if (!isAdminOrModerator) return null

	return (
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
						<Button className='mBtn_error !justify-start' onClick={() => handleDelete(substationId)}>
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

export default ControlMenu
