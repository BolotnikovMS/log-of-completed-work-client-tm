import { useEffect, useState, type FC } from 'react'
import { TypeKpForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, Pagination, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteTypeKp, useModal, useTypesKp } from '../../../../hooks'
import { ITypeKp } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const TypesKpCards: FC = () => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const [page, setPage] = useState<number>(1)
	const { typesKp: data, error, isError, isLoading } = useTypesKp({ limit: 20, page })
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [typeKp, setDistrict] = useState<ITypeKp | null>(null)
	const { deleteTypeKp } = useDeleteTypeKp()
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteTypeKp.mutate(id)
	}

	useEffect(() => {
		if (data?.data.length === 0 && page !== 1) {
			setPage(page - 1)
		}
	}, [data?.data.length, page])

	if (isError && error) return <Error error={error} />

	if (isLoading) return <Loader />

	return (
		<>
			{!!data?.data.length && (
				<div className='flex flex-col gap-2'>
					<div className="cards">
						{data.data.map(typeKp => (
							<SmallCard
								key={typeKp.id}
								childrenContent={
									<p className='text-content'>
										{typeKp.name}
									</p>
								}
								childrenControl={
									isAdminOrModerator && (
										<Dropdown
											children={<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />}
											tooltipText='Меню'
											classBtnTrigger='btn-circle'
											menuItems={[
												isAdminOrModerator && (
													<Button className='!justify-start' onClick={() => { toggleModal(), setDistrict(typeKp), setIsEdited(!isEdited) }}>
														<Icon id='edit' />
														Редактировать
													</Button>
												),
												isAdmin && (
													<Button className='mBtn_error !justify-start' onClick={() => handleDelete(typeKp.id)}>
														<Icon id='delete' />
														Удалить
													</Button>
												)
											]}
										/>
									)
								}
							/>
						))}
					</div>
					<Pagination page={page} meta={data.meta} setPage={setPage} />
				</div>
			)}
			{(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Типов КП пока не добавлено...' />}
			<Modal
				visible={isModal}
				title='Редактирование записи'
				onToggle={
					() => { toggleModal(), setIsEdited(false) }} content={<TypeKpForm data={typeKp} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />
					}
			/>
		</>
	)
}

export default TypesKpCards
