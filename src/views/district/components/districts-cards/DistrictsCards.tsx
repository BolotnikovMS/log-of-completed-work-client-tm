import { useState, type FC } from 'react'
import { DistrictForm } from '..'
import { Button, Dropdown, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteDistrict, useInfiniteDistricts, useModal } from '../../../../hooks'
import { Delete, Edit, LinkIcon, Setting } from '../../../../icons'
import { IDistrict } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const DistrictsCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 20 })
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
                    <LinkIcon className='icon' />
                    {district.name}
                  </p>
                }
                path={`/districts/${district.id}/substations`}
                childrenControl={
                  isAdminOrModerator &&
                  <Dropdown
                    children={
                      <Setting className='icon' />
                    }
                    menuItems={[
                      isAdminOrModerator && (
                        <Button className='!justify-start' onClick={() => { toggleModal(), setDistrict(district), setIsEdited(!isEdited) }}>
                          <Edit className='icon' />
                          Редактировать
                        </Button>
                      ),
                      isAdmin && (
                        <Button className='btn-error !justify-start' onClick={() => handleDelete(district.id)}>
                          <Delete className='icon' />
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
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<DistrictForm district={district} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default DistrictsCards
