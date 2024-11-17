import { useEffect, useState, type FC } from 'react'
import { VoltageClassForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, Pagination, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteVoltageClass, useModal, useVoltageClasses } from '../../../../hooks'
import { IVoltageClass } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const VoltageClassesCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const [page, setPage] = useState<number>(1)
  const { voltageClasses: data, error, isError, isLoading } = useVoltageClasses({ limit: 15, page })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [voltageClass, setVoltageClass] = useState<IVoltageClass | null>(null)
  const { deleteVoltageClass } = useDeleteVoltageClass()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteVoltageClass.mutate(id)
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
            {data.data.map(voltageClass => (
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
            ))}
          </div>
          <Pagination page={page} meta={data.meta} setPage={setPage} />
        </div>
      )}
      {(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Классов напряжения пока не добавлено...' />}
      <Modal
        visible={isModal}
        title='Редактирование записи'
        onToggle={() => { toggleModal(), setIsEdited(false) }} content={<VoltageClassForm data={voltageClass} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />}
      />
    </>
  )
}

export default VoltageClassesCards
