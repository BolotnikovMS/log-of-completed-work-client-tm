import { useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DistrictForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, Pagination, SmallCard } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteDistrict, useDistricts, useModal } from '../../../../hooks'
import { IDistrict } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TOrderSort } from '../../../../types/order.types'

const DistrictsCards: FC = () => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const [page, setPage] = useState<number>(1)
	const [searchParams] = useSearchParams()
	const sortParam = searchParams.get('sort') || 'name'
	const orderParam = searchParams.get('order') || 'asc'
	const { districts: data, error, isError, isLoading } = useDistricts({ limit: 15, page, sort: sortParam, order: orderParam as TOrderSort })
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [district, setDistrict] = useState<IDistrict | null>(null)
	const { deleteDistrict } = useDeleteDistrict()
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteDistrict.mutate(id)
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
						{data.data.map(district => (
							<SmallCard
								key={district.id}
								childrenContent={
									<p className='text-content flex items-center gap-1'>
										<Icon id='link' />
										{district.name}
									</p>
								}
								path={pageConfig.getDynamicUrl(pageConfig.districtSubstations, { id: district.id })}
								childrenControl={
									isAdminOrModerator &&
									<Dropdown
										children={
											<Icon id='setting' />
										}
										menuItems={[
											isAdminOrModerator && (
												<Button className='!justify-start' onClick={() => { toggleModal(), setDistrict(district), setIsEdited(!isEdited) }}>
													<Icon id='edit' />
													Редактировать
												</Button>
											),
											isAdmin && (
												<Button className='btn-error !justify-start' onClick={() => handleDelete(district.id)}>
													<Icon id='delete' />
													Удалить
												</Button>
											)
										]}
									/>
								}
							/>
						))}
					</div>
					<Pagination page={page} meta={data.meta} setPage={setPage} />
				</div>
			)}
			{(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
			<Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<DistrictForm data={district} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
		</>
	)
}

export default DistrictsCards

// export function useIntersection(onIntersect: () => void) {
//   const unsubscribe = useRef(() => {})

//   return useCallback((el: HTMLDivElement | null) => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(intersection => {
//         if (intersection.isIntersecting) {
//           onIntersect()
//         }
//       })
//     })

//     if (el) {
//       observer.observe(el)
//       unsubscribe.current = () => observer.disconnect()
//     } else {
//       unsubscribe.current()
//     }
//   }, [])
// }
