import { useState, type FC } from 'react'
import { VoltageClassForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteVoltageClass, useInfiniteVoltageClasses, useModal } from '../../../../hooks'
import { IVoltageClass } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const VoltageClassesCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 20 })
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
                childrenContent={
                  <p className='text-content'>
                    {voltageClass.name}
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
                          <Button className='!justify-start' onClick={() => { toggleModal(), setVoltageClass(voltageClass), setIsEdited(!isEdited) }}>
                            <Icon id='edit' />
                            Редактировать
                          </Button>
                        ),
                        isAdmin && (
                          <Button className='btn-error !justify-start' onClick={() => handleDelete(voltageClass.id)}>
                            <Icon id='delete' />
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Классов напряжения пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal
        visible={isModal}
        title='Редактирование записи'
        onToggle={() => { toggleModal(), setIsEdited(false) }} content={<VoltageClassForm data={voltageClass} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />}
      />
    </>
  )
}

export default VoltageClassesCards
