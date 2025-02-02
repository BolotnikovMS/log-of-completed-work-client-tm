import { useCallback, useState, type FC } from 'react'
import { ObjectTypeForm } from '../../..'
import { Button, Dropdown, Icon, Modal } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useDeleteObjectType, useModal } from '../../../../../hooks'
import { IObjectType, IPropsCardControl } from '../../../../../interfaces'
import { useAuthStore } from '../../../../../store/auth'

const CardControl: FC<IPropsCardControl<IObjectType>> = ({ data: objectType }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteObjectType } = useDeleteObjectType()
	const handleDelete = useCallback((id: number): void | null => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteObjectType.mutate(id)
	}, [deleteObjectType])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])

	return (
		<>
			{isAdminOrModerator && (
				<Dropdown
					children={
						<Icon id='setting' className='icon__setting' />
					}
					menuItems={[
						isAdminOrModerator && (
							<Button className='!justify-start' onClick={() => { handleEdit() }}>
								<Icon id='edit' />
								Редактировать
							</Button>
						),
						isAdmin && (
							<Button className='!justify-start btn-error' onClick={() => { handleDelete(objectType.id) }}>
								<Icon id='delete' />
								Удалить
							</Button>
						)
					]}
				/>
			)}
			<Modal
				visible={isModal}
				title='Редактирование записи'
				onToggle={() => { toggleModal(), setIsEdited(false) }}
				content={
					<ObjectTypeForm
						data={objectType}
						isEdited={isEdited}
						setIsEdited={setIsEdited}
						toggleModal={toggleModal}
					/>
				}
			/>
		</>
	)
}

export default CardControl
