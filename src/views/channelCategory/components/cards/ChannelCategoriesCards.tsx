import { type FC } from 'react'
import { Error, InfoMessage, Loader, LoadMore, SmallCard } from '../../../../components'
import { useInfiniteChannelCategories } from '../../../../hooks'
import { CardControl } from './cardParts'

const ChannelCategoriesCards: FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteChannelCategories({ limit: 20 })

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.length && (
        <div className='cards'>
          {data.map(channelCategories => (
            channelCategories.data.map(channelCategory => (
              <SmallCard
                key={channelCategory.id}
                childrenContent={
                  <p className='text-content'>
                    {channelCategory.name}
                  </p>
                }
                childrenControl={
                  <CardControl data={channelCategory} />
                }
              />
            ))
          ))}
        </div>
      )}
      {(!data?.length && !isFetching && !isError) && (
        <InfoMessage text='Пока добавленных категорий каналов нет...' />
      )}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default ChannelCategoriesCards
