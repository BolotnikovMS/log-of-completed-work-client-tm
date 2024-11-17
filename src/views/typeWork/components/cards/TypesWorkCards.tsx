import { type FC } from 'react'
import { Error, InfoMessage, Loader, LoadMore, SmallCard } from '../../../../components'
import { useInfiniteTypesWork } from '../../../../hooks'
import { CardControl } from './cardParts'

const TypesWorkCards: FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesWork({ limit: 20 })

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.length && (
        <div className='cards'>
          {data.map(typesWork => (
            typesWork.data.map(typeWork => (
              <SmallCard
                key={typeWork.id}
                childrenContent={
                  <p className='text-content'>
                    {typeWork.name}
                  </p>
                }
                childrenControl={
                  <CardControl data={typeWork} />
                }
              />
            ))
          ))}
        </div>
      )}
      {(!data?.length && !isFetching && !isError) && (
        <InfoMessage text='Пока добавленных категорий работ нет...' />
      )}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default TypesWorkCards
