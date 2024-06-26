import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, InfoMessage, Loader, LoadMore, Modal, SmallCard } from '../../../../components'
import { useDeleteVoltageClass, useInfiniteVoltageClasses, useModal } from '../../../../hooks'

import { VoltageClassForm } from '..'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { IVoltageClass } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const VoltageClassesCards: FC = () => {
	const { authUser } = useAuthStore()
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [voltageClass, setVoltageClass] = useState<IVoltageClass | null>(null)
  const { deleteVoltageClass } = useDeleteVoltageClass()
  const handleDelete = (id:number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteVoltageClass.mutate(id)
  }

	if (isError && error) return <Error error={error}/>

	if (isFetching) return <Loader />
  
  return (
    <>
      {!!data?.pages[0].data.length && (
				<div className="cards">
					{data.pages.map(voltageClasses => (
						voltageClasses.data.map(voltageClass => (
							<SmallCard
								key={voltageClass.id}
								cardText={voltageClass.name}
								childrenControl={
									<>
										{
											checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
												<Button onClick={() => {toggleModal(), setVoltageClass(voltageClass), setIsEdited(!isEdited)}}>
													<Pencil />
												</Button>
											)
										}
										{
											checkRole(authUser, [ERoles.Admin]) && (
												<Button classBtn='btn-bg_red' onClick={() => handleDelete(voltageClass.id)}>
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
			{(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Классов напряжения пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<VoltageClassForm voltageClass={voltageClass} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />}/>
    </>
  )
}

export default VoltageClassesCards