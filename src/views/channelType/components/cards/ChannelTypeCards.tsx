import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, InfoMessage, Loader, LoadMore, Modal, SmallCard } from '../../../../components'
import { useDeleteChannelType, useInfiniteChannelTypes, useModal } from '../../../../hooks'

import { ChannelTypeForm } from '..'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { IChannelType } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const ChannelTypeCards: FC = () => {
	const { authUser } = useAuthStore()
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteChannelTypes({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [channelType, setChannelType] = useState<IChannelType | null>(null)
  const { deleteChannelType } = useDeleteChannelType()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteChannelType.mutate(id)
  }

	if (isError && error) return <Error error={error}/>
	
	if (isFetching) return <Loader />


  return (
    <>
      {!!data?.pages[0].data.length && (
          <div className="cards">
            {data.pages.map(channelTypes => (
              channelTypes.data.map(channelType => (
                <SmallCard
                  key={channelType.id}
                  cardText={channelType.name}
                  childrenControl={
                    <>
											{
												checkRole(authUser, [ERoles.Admin]) && (
													<Button onClick={() => {toggleModal(), setChannelType(channelType), setIsEdited(!isEdited)}}>
														<Pencil />
													</Button>
												)
											}
											{
												checkRole(authUser, [ERoles.Admin]) && (
													<Button classBtn='btn-bg_red' onClick={() => handleDelete(channelType.id)}>
														<Trash2 />
													</Button>
												)
											}
                    </>
                  }
                />
              ))
            ))}
          </div>
        )
      }
      {(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Пока добавленных каналов нет...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<ChannelTypeForm channelType={channelType} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}

export default ChannelTypeCards