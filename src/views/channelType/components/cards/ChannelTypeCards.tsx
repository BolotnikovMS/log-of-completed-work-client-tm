import { useEffect, useState, type FC } from 'react'
import { ChannelTypeForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, Pagination, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useChannelTypes, useDeleteChannelType, useModal } from '../../../../hooks'
import { IChannelType } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const ChannelTypeCards: FC = () => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const [page, setPage] = useState<number>(1)
	const { data, error, isError, isLoading } = useChannelTypes({ limit: 20, page })
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [channelType, setChannelType] = useState<IChannelType | null>(null)
	const { deleteChannelType } = useDeleteChannelType()
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteChannelType.mutate(id)
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
						{data.data.map(channelType => (
							<SmallCard
								key={channelType.id}
								childrenContent={
									<p className='text-content'>
										{channelType.name}
									</p>
								}
								childrenControl={
									isAdminOrModerator && (
										<Dropdown
											children={
												<Icon id='setting' />
											}
											menuItems={[
												isAdminOrModerator && (
													<Button className='!justify-start' onClick={() => { toggleModal(), setChannelType(channelType), setIsEdited(!isEdited) }}>
														<Icon id='edit' />
														Редактировать
													</Button>
												),
												isAdmin && (
													<Button className='mBtn_error !justify-start' onClick={() => handleDelete(channelType.id)}>
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
			{(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Пока добавленных типов каналов нет...' />}
			<Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<ChannelTypeForm data={channelType} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
		</>
	)
}

export default ChannelTypeCards
