import { useState, type FC } from 'react'
import { HeadControllerForm } from '..'
import { Button, Dropdown, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteHeadController, useInfiniteHeadControllers, useModal } from '../../../../hooks'
import { Delete, Edit, Setting } from '../../../../icons'
import { IHeadController } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const HeadControllersCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteHeadControllers({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [headController, setHeadController] = useState<IHeadController | null>(null)
  const { deleteHeadController } = useDeleteHeadController()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteHeadController.mutate(id)
  }

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.pages[0].data.length && (
        <div className="cards">
          {data.pages.map(headControllers => (
            headControllers.data.map(headController => (
              <SmallCard
                key={headController.id}
                cardText={headController.name}
                childrenControl={
                  isAdminOrModerator && (
                    <Dropdown
                      classMenu='dropdownMenuRow dropdownMenuCenter'
                      children={
                        <Setting className='icon' />
                      }
                      menuItems={[
                        isAdminOrModerator && (
                          <Button onClick={() => { toggleModal(), setHeadController(headController), setIsEdited(!isEdited) }}>
                            <Edit className='icon' />
                          </Button>
                        ),
                        isAdmin && (
                          <Button classBtn='btn-bg_red' onClick={() => handleDelete(headController.id)}>
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Головных контроллеров пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<HeadControllerForm headController={headController} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default HeadControllersCards
