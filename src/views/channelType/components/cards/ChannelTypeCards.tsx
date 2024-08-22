import { useState, type FC } from 'react'
import { ChannelTypeForm } from '..'
import { Button, Dropdown, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteChannelType, useInfiniteChannelTypes, useModal } from '../../../../hooks'
import { Delete, Edit, Setting } from '../../../../icons'
import { IChannelType } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const ChannelTypeCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteChannelTypes({ limit: 20 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [channelType, setChannelType] = useState<IChannelType | null>(null)
  const { deleteChannelType } = useDeleteChannelType()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteChannelType.mutate(id)
  }

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />


  return (
    <>
      {!!data?.pages[0].data.length && (
        <div className="cards">
          {data.pages.map(channelTypes => (
            channelTypes.data.map(channelType => (
              <SmallCard
                key={channelType.id}
                childrenContent={
                  <p className='text-content'>
                    {channelType.name}
                  </p>
                }
                childrenControl={
                  isAdminOrModerator && (
                    <Dropdown
                      children={
                        <Setting className='icon' />
                      }
                      menuItems={[
                        isAdminOrModerator && (
                          <Button className='!justify-start' onClick={() => { toggleModal(), setChannelType(channelType), setIsEdited(!isEdited) }}>
                            <Edit className='icon' />
                            Редактировать
                          </Button>
                        ),
                        isAdmin && (
                          <Button className='btn-error !justify-start' onClick={() => handleDelete(channelType.id)}>
                            <Delete className='icon' />
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
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Пока добавленных каналов нет...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<ChannelTypeForm channelType={channelType} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default ChannelTypeCards
