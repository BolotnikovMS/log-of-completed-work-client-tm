import { useState, type FC } from 'react'
import { TypeKpForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteTypeKp, useInfiniteTypesKp, useModal } from '../../../../hooks'
import { ITypeKp } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const TypesKpCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesKp({ limit: 20 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [typeKp, setDistrict] = useState<ITypeKp | null>(null)
  const { deleteTypeKp } = useDeleteTypeKp()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteTypeKp.mutate(id)
  }

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.length && (
        <div className="cards">
          {data.map(typesKp => (
            typesKp.data.map(typeKp => (
              <SmallCard
                key={typeKp.id}
                childrenContent={
                  <p className='text-content'>
                    {typeKp.name}
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
                          <Button className='!justify-start' onClick={() => { toggleModal(), setDistrict(typeKp), setIsEdited(!isEdited) }}>
                            <Icon id='edit' />
                            Редактировать
                          </Button>
                        ),
                        isAdmin && (
                          <Button className='btn-error !justify-start' onClick={() => handleDelete(typeKp.id)}>
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
      {(!data?.length && !isFetching && !isError) && <InfoMessage text='Типов КП пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal
        visible={isModal}
        title='Редактирование записи'
        onToggle={
          () => { toggleModal(), setIsEdited(false) }} content={<TypeKpForm data={typeKp} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />
          }
      />
    </>
  )
}

export default TypesKpCards
