import { useState, type FC } from 'react'
import { VoltageClassForm } from '..'
import { Button, Dropdown, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteVoltageClass, useInfiniteVoltageClasses, useModal } from '../../../../hooks'
import { Delete, Edit, Setting } from '../../../../icons'
import { IVoltageClass } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const VoltageClassesCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [voltageClass, setVoltageClass] = useState<IVoltageClass | null>(null)
  const { deleteVoltageClass } = useDeleteVoltageClass()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteVoltageClass.mutate(id)
  }

  if (isError && error) return <Error error={error} />

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
                  isAdminOrModerator && (
                    <Dropdown
                      classMenu='dropdownMenuRow dropdownMenuCenter'
                      children={
                        <Setting className='icon' />
                      }
                      menuItems={[
                        isAdminOrModerator && (
                          <Button onClick={() => { toggleModal(), setVoltageClass(voltageClass), setIsEdited(!isEdited) }}>
                            <Edit className='icon' />
                          </Button>
                        ),
                        isAdmin && (
                          <Button classBtn='btn-bg_red' onClick={() => handleDelete(voltageClass.id)}>
                            <Delete className='icon' />
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Классов напряжения пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<VoltageClassForm voltageClass={voltageClass} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />} />
    </>
  )
}

export default VoltageClassesCards
