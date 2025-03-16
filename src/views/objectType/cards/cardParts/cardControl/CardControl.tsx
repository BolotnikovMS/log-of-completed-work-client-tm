import { memo, useCallback, useState, type FC } from 'react'
import { ObjectTypeForm } from '../../..'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useDeleteObjectType, useModal, useObjectType } from '../../../../../hooks'
import { useAuthStore } from '../../../../../store/auth'

const CardControl: FC<{ objectTypeId: number }> = memo(({ objectTypeId }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteObjectType } = useDeleteObjectType()
	const { data, error, isError, isLoading } = useObjectType(objectTypeId, {
		enabled: isModal
	})
	const handleDelete = useCallback((id: number): void | null => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteObjectType.mutate(id)
	}, [deleteObjectType])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent =
		isLoading ?
			<Loader /> :
			isError ?
				<Error error={error} /> :
				<ObjectTypeForm
					data={data}
					isEdited={isEdited}
					setIsEdited={setIsEdited}
					toggleModal={toggleModal}
				/>

	if (!isAdminOrModerator) return null

	return (
		<>
			<Dropdown
				children={<Icon id='setting' className='icon__setting' />}
				classBtnTrigger='btn-circle'
				menuItems={[
					isAdminOrModerator && (
						<Button className='!justify-start' onClick={handleEdit}>
							<Icon id='edit' />
							Редактировать
						</Button>
					),
					isAdmin && (
						<Button className='!justify-start mBtn_error' onClick={() => { handleDelete(objectTypeId) }}>
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

export default CardControl
