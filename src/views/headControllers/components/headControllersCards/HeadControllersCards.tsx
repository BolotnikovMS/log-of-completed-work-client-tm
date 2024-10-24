import { useState, type FC } from 'react'
import { HeadControllerForm } from '..'
import { Button, Dropdown, Error, Icon, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteHeadController, useInfiniteHeadControllers, useModal } from '../../../../hooks'
import { IHeadController } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const HeadControllersCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteHeadControllers({ limit: 20 })
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
                childrenContent={
                  <p className='text-content'>
                    {headController.name}
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
                          <Button className='!justify-start' onClick={() => { toggleModal(), setHeadController(headController), setIsEdited(!isEdited) }}>
                            <Icon id='edit' />
                            Редактировать
                          </Button>
                        ),
                        isAdmin && (
                          <Button className='btn-error !justify-start' onClick={() => handleDelete(headController.id)}>
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Головных контроллеров пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal
        visible={isModal}
        title='Редактирование записи'
        onToggle={
          () => { toggleModal(), setIsEdited(false) }} content={
            <HeadControllerForm data={headController} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal}
            />
          }
      />
    </>
  )
}

export default HeadControllersCards
