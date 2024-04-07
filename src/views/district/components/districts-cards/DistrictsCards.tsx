import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, InfoMessage, Loader, LoadMore, Modal, SmallCard } from '../../../../components'
import { useDeleteDistrict, useInfiniteDistricts, useModal } from '../../../../hooks'

import { DistrictForm } from '..'
import { checkRole, ERoles } from '../../../../helpers/checkRole.helper'
import { IDistrict } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const DistrictsCards: FC = () => {
	const { authUser } = useAuthStore()
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [district, setDistrict] = useState<IDistrict | null>(null)
  const { deleteDistrict } = useDeleteDistrict()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteDistrict.mutate(id)
  }

	if (isError && error) return <Error error={error}/>

	if (isFetching) return <Loader />

  return (
    <>
			{!!data?.pages[0].data.length && (
				<div className="cards">
					{data.pages.map(districts => (
						districts.data.map(district => (
							<SmallCard
								key={district.id}
								cardText={district.name}
								path={`/districts/${district.id}/substations`}
								childrenControl={
									<>
										{
											checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
												<Button onClick={() => {toggleModal(), setDistrict(district), setIsEdited(!isEdited)}}>
													<Pencil />
												</Button>
											)
										}
										{
											checkRole(authUser, [ERoles.Admin]) && (
												<Button classBtn='btn-bg_red' onClick={() => handleDelete(district.id)}>
													<Trash2 />
												</Button>
											)
										}
									</>
								}
							/>
						))
					))}
				</div>
			)}
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<DistrictForm district={district} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}

export default DistrictsCards