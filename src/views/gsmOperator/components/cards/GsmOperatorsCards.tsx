import { useState, type FC } from 'react'
import { GsmOperatorForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useDeleteGsmOperator, useGsmOperators, useModal } from '../../../../hooks'
import { IGsmOperator } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const GsmOperatorsCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, isError, isFetching } = useGsmOperators()
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [gsmOperator, setGsmOperator] = useState<IGsmOperator | null>(null)
  const { deleteGsmOperator } = useDeleteGsmOperator()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteGsmOperator.mutate(id)
  }

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.length && (
        <div className="cards">
          {data.map(gsmOperator => (
            <SmallCard
              key={gsmOperator.id}
              childrenContent={
                <p className='text-content'>
                  {gsmOperator.name}
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
                        <Button className='!justify-start' onClick={() => { toggleModal(), setGsmOperator(gsmOperator), setIsEdited(!isEdited) }}>
                          <Icon id='edit' />
                          Редактировать
                        </Button>
                      ),
                      isAdmin && (
                        <Button className='btn-error !justify-start' onClick={() => handleDelete(gsmOperator.id)}>
                          <Icon id='delete' />
                          Удалить
                        </Button>
                      ),
                    ]}
                  />
                )
              }
            />
          ))}
        </div>
      )}
      {(!data?.length && !isFetching && !isError) && <InfoMessage text='GSM операторов пока не добавлено...' />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<GsmOperatorForm gsmOperator={gsmOperator} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default GsmOperatorsCards
