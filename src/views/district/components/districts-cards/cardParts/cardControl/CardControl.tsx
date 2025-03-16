import { memo, useCallback, useState, type FC } from 'react'
import { DistrictForm } from '../../..'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteDistrict, useDistrict, useModal } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'

const CardControl: FC<{ districtId: number }> = memo(({ districtId }) => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { deleteDistrict } = useDeleteDistrict()
	const { data, error, isError, isLoading } = useDistrict(districtId, {
		enabled: isModal
	})
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteDistrict.mutate(id)
	}
	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModal()
	}, [isEdited, toggleModal])
	const modalContent =
		isLoading ?
			<Loader /> :
			isError ?
				<Error error={error} /> :
				<DistrictForm
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
						<Button className='mBtn_error !justify-start' onClick={() => handleDelete(districtId)}>
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
