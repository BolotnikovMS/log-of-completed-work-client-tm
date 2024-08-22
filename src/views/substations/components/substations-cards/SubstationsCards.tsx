import { useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SubstationForm } from '..'
import { Badge, Button, Dropdown, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteSubstation, useInfiniteSubstations, useModal } from '../../../../hooks'
import { Delete, Edit, Setting } from '../../../../icons'
import { ISubstation } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TOrderSort } from '../../../../types/order.types'

const SubstationsCards: FC = () => {
  const [searchParams] = useSearchParams()
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteSubstations({ limit: 20, search: searchParams.get('search') ?? '', sort: searchParams.get('sort') || 'name', order: (searchParams.get("order") ?? 'asc') as TOrderSort })
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

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!memoizedSubstations?.pages[0].data.length && (
        <div className="cards">
          {memoizedSubstations.pages.map(substations => (
            substations.data.map(substation => (
              <SmallCard
                key={substation.id}
                childrenContent={
                  <>
                    {substation.rdu && <Badge text='РДУ' className='mBadge_red' />}
                    <p className='text-lg'>{substation.fullNameSubstation}</p>
                  </>
                }
                path={`/substations/${substation.id}`}
                childrenControl={
                  isAdminOrModerator && (
                    <Dropdown
                      children={
                        <Setting className='icon' />
                      }
                      menuItems={[
                        isAdminOrModerator && (
                          <Button className='!justify-start' onClick={() => { toggleModal(), setSubstation(substation), setIsEdited(!isEdited) }}>
                            <Edit className='icon' />
                            Редактировать
                          </Button>
                        ),
                        isAdmin && (
                          <Button className='btn-error !justify-start' onClick={() => handleDelete(substation.id)}>
                            <Delete className='icon' />
                            Удалить
                          </Button>
                        )
                      ]}
                    />
                  )
                }
              />
            ))
          ))}
        </div>
      )}
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Подстанций пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<SubstationForm substation={substation} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default SubstationsCards
