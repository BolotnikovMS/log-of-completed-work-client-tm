import { useState, type FC } from 'react'
import { TypeKpForm } from '..'
import { Button, Dropdown, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteTypeKp, useInfiniteTypesKp, useModal } from '../../../../hooks'
import { Delete, Edit, Setting } from '../../../../icons'
import { ITypeKp } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const TypesKpCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesKp({ limit: 15 })
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
      {!!data?.pages[0].data.length && (
        <div className="cards">
          {data.pages.map(typesKp => (
            typesKp.data.map(typeKp => (
              <SmallCard
                key={typeKp.id}
                cardText={typeKp.name}
                childrenControl={
                  isAdminOrModerator && (
                    <Dropdown
                      classMenu='dropdownMenuRow dropdownMenuCenter'
                      children={
                        <Setting className='icon' />
                      }
                      menuItems={[
                        isAdminOrModerator && (
                          <Button onClick={() => { toggleModal(), setDistrict(typeKp), setIsEdited(!isEdited) }}>
                            <Edit className='icon' />
                          </Button>
                        ),
                        isAdmin && (
                          <Button classBtn='btn-bg_red' onClick={() => handleDelete(typeKp.id)}>
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Типов КП пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<TypeKpForm typeKp={typeKp} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />} />
    </>
  )
}

export default TypesKpCards
