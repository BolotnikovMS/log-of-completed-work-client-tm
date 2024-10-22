import { useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DistrictForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteDistrict, useInfiniteDistricts, useModal } from '../../../../hooks'
import { IDistrict } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TOrderSort } from '../../../../types/order.types'

const DistrictsCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const [searchParams] = useSearchParams()
  const sortParam = searchParams.get('sort') || 'name'
  const orderParam = searchParams.get('order') || 'asc'
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 20, sort: sortParam, order: orderParam as TOrderSort })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [district, setDistrict] = useState<IDistrict | null>(null)
  const { deleteDistrict } = useDeleteDistrict()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteDistrict.mutate(id)
  }

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.pages[0].data.length && (
        <div className="cards">
          {data.pages.map(districts => (
            districts.data.map(district => (
              <SmallCard
                key={district.id}
                childrenContent={
                  <p className='text-content flex items-center gap-1'>
                    <Icon id='link' />
                    {district.name}
                  </p>
                }
                path={`/districts/${district.id}/substations`}
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
                  />}
              />
            ))
          ))}
        </div>
      )}
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<DistrictForm data={district} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default DistrictsCards
