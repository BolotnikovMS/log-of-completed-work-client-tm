import { type FC } from 'react'
import { Error, InfoMessage, Loader, LoadMore, SmallCard } from '../../../../components'
import { useInfiniteChannelingEquipment } from '../../../../hooks'
import { ChannelEquipmentControlMenu } from './cardParts'

const ChannelEquipmentCards: FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteChannelingEquipment({ limit: 20 })

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.length && (
        <div className='cards'>
          {data.map(channelingEquipment => (
            channelingEquipment.data.map(channelEquipment => (
              <SmallCard
                key={channelEquipment.id}
                childrenContent={
                  <p className='text-content'>
                    {channelEquipment.name}
                  </p>
                }
                childrenControl={
                  <ChannelEquipmentControlMenu channelEquipment={channelEquipment} />
                }
              />
            ))
          ))}
        </div>
      )}
      {(!data?.length && !isFetching && !isError) && (
        <InfoMessage text='Пока добавленного оборудования нет...' />
      )}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default ChannelEquipmentCards
