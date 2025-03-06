import { MouseEvent, memo, useCallback, useState, type FC } from 'react'
import { CompletedWorkForm } from '../../..'
import { Button, Dropdown, Error, Icon, Loader, Modal, Tooltip } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useCompletedWork, useDeleteCompletedWork, useModal } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'
import { IPropsCardControl } from './cardControl.interface'

const CardControl: FC<IPropsCardControl> = memo(({ completedWork }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModeratorOrAuthor = checkRole(authUser, [ERoles.Admin, ERoles.Moderator], true, completedWork)
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteCompletedWork } = useDeleteCompletedWork()
	const { data, error, isError, isLoading } = useCompletedWork(completedWork.id, {
		enabled: isModal
	})
	const handleDelete = useCallback((id: number, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void | null => {
		e.stopPropagation()
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteCompletedWork.mutate(id)
	}, [deleteCompletedWork])
	const handleEdit = useCallback((e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation()
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent =
		isLoading ? <Loader /> :
			isError ?
				<Error error={error} /> :
				<CompletedWorkForm
					data={data}
					toggleModal={toggleModal}
					isEdited={isEdited}
					setIsEdited={setIsEdited}
				/>

	if (!isAdminOrModeratorOrAuthor) return null

	return (
		<>
			<Dropdown
				children={
					<Tooltip text='Меню'>
						<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />
					</Tooltip>
				}
				classBtnTrigger='btn-circle'
				menuItems={[
					isAdminOrModeratorOrAuthor && (
						<Button className='!justify-start' onClick={(e) => { handleEdit(e) }} aria-label='Редактировать'>
							<Icon id='edit' aria-label='Иконка редактирования' />
							Редактировать
						</Button>
					),
					isAdmin && (
						<Button className='!justify-start mBtn_error' onClick={(e) => { handleDelete(completedWork.id, e) }} aria-label='Удалить'>
							<Icon id='delete' aria-label='Иконка удалить' />
							Удалить
						</Button>
					)
				]}
			/>
			<Modal
				visible={isModal}
				title='Редактирование записи'
				onToggle={(e) => { e.stopPropagation(), toggleModal(), setIsEdited(false) }}
				content={modalContent}
			/>
		</>
	)
})

export default CardControl
