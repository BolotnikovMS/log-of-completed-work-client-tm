import { memo, useCallback, useState, type FC } from 'react'
import { TypeWorkForm } from '../../..'
import { Button, Dropdown, Icon, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteTypeWork, useModal } from '../../../../../../hooks'
import { IPropsCardControl, ITypeWork } from '../../../../../../interfaces'
import { useAuthStore } from '../../../../../../store/auth'

const CardControl: FC<IPropsCardControl<ITypeWork>> = memo(({ data: typeWork }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteTypeWork } = useDeleteTypeWork()
	const handleDelete = useCallback((id: number): void | null => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteTypeWork.mutate(id)
	}, [deleteTypeWork])
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])

	return (
		<>
			{isAdminOrModerator && (
				<Dropdown
					children={<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />}
					tooltipText='Меню'
					classBtnTrigger='btn-circle'
					menuItems={[
						isAdminOrModerator && (
							<Button className='!justify-start' onClick={() => { handleEdit() }}>
								<Icon id='edit' />
								Редактировать
							</Button>
						),
						isAdmin && (
							<Button className='!justify-start mBtn_error' onClick={() => { handleDelete(typeWork.id) }}>
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
					<TypeWorkForm
						data={typeWork}
						isEdited={isEdited}
						setIsEdited={setIsEdited}
						toggleModal={toggleModal}
					/>
				}
			/>
		</>
	)
})

export default CardControl
