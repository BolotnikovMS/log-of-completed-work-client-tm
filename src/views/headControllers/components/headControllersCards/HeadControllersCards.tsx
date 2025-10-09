import { useEffect, useState, type FC } from 'react'
import { HeadControllerForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, Pagination, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteHeadController, useHeadControllers, useModal } from '../../../../hooks'
import { IHeadController } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const HeadControllersCards: FC = () => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const [page, setPage] = useState<number>(1)
	const { headControllers: data, error, isError, isLoading } = useHeadControllers({ limit: 20, page })
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [headController, setHeadController] = useState<IHeadController | null>(null)
	const { deleteHeadController } = useDeleteHeadController()
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteHeadController.mutate(id)
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
						{data.data.map(headController => (
							<SmallCard
								key={headController.id}
								childrenContent={
									<div className='flex flex-col gap-3'>
										<p className='text-content'>
											{headController.name}
										</p>
										{headController.actualFirmwareVersion && (
											<p className='text-content !text-sm text-gray-400/70'>
												Прошивка: {headController.actualFirmwareVersion}
											</p>
										)}
									</div>
								}
								childrenControl={
									isAdminOrModerator && (
										<Dropdown
											children={<Icon id='setting' className='icon__setting' aria-label='Иконка меню' />}
											tooltipText='Меню'
											classBtnTrigger='btn-circle'
											menuItems={[
												isAdminOrModerator && (
													<Button className='!justify-start' onClick={() => { toggleModal(), setHeadController(headController), setIsEdited(!isEdited) }}>
														<Icon id='edit' />
														Редактировать
													</Button>
												),
												isAdmin && (
													<Button className='mBtn_error !justify-start' onClick={() => handleDelete(headController.id)}>
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
			{(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Головных контроллеров пока не добавлено...' />}
			<Modal
				visible={isModal}
				title='Редактирование записи'
				onToggle={
					() => { toggleModal(), setIsEdited(false) }} content={<HeadControllerForm data={headController} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}
			/>
		</>
	)
}

export default HeadControllersCards
