import { Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState, type FC } from 'react'
import { Badge, Button, Error, InfoMessage, Loader, LoadMore, Modal, SmallCard } from '../../../../components'

import { useSearchParams } from 'react-router-dom'
import { SubstationForm } from '..'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteSubstation, useInfiniteSubstations, useModal } from '../../../../hooks'
import { ISubstation } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TOrderSort } from '../../../../types/order.types'

const SubstationsCards: FC = () => {
	const [searchParams] = useSearchParams()
	const { authUser } = useAuthStore()
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteSubstations({ limit: 10, search: searchParams.get('search') ?? '', sort: searchParams.get('sort') || 'name', order: (searchParams.get("order") ?? 'asc') as TOrderSort })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [substation, setSubstation] = useState<ISubstation | null>(null)
  const { deleteSubstation } = useDeleteSubstation()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteSubstation.mutate(id)
  }
	const memoizedSubstations = useMemo(() => data, [data])

	if (isError && error) return <Error error={error}/>

	if (isFetching) return <Loader />
  
  return (
    <>
      {!!memoizedSubstations?.pages[0].data.length && (
				<div className="cards">
					{memoizedSubstations.pages.map(substations => (
						substations.data.map(substation => (
							<SmallCard
								key={substation.id}
								childrenContent={substation.rdu && <Badge text='РДУ' className='badge-color_red' />}
								cardText={substation.fullNameSubstation}
								path={`/substations/${substation.id}`}
								childrenControl={
									<>
										{
											checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
												<Button onClick={() => {toggleModal(), setSubstation(substation), setIsEdited(!isEdited)}}>
													<Pencil />
												</Button>
											)
										}
										{
											checkRole(authUser, [ERoles.Admin]) && (
												<Button classBtn='btn-bg_red' onClick={() => handleDelete(substation.id)}>
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Подстанций пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<SubstationForm substation={substation} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}

export default SubstationsCards