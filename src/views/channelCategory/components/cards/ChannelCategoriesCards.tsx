import { useEffect, useState, type FC } from 'react'
import { Error, InfoMessage, Loader, Pagination, SmallCard } from '../../../../components'
import { useChannelCategories } from '../../../../hooks'
import { CardControl } from './cardParts'

const ChannelCategoriesCards: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data, error, isError, isLoading } = useChannelCategories({ limit: 20, page })

  useEffect(() => {
    if (data?.data.length === 0 && page !== 1) {
      setPage(page - 1)
    }
  }, [data?.data.length, page])

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  return (
    <>
      {!!data?.data.length && (
        <div className='flex flex-col gap-2'>
          <div className='cards'>
            {data.data.map(channelCategory => (
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
            ))}
          </div>
          <Pagination page={page} meta={data.meta} setPage={setPage} />
        </div>
      )}
      {(!data?.data.length && !isLoading && !isError) && (
        <InfoMessage text='Пока добавленных категорий каналов нет...' />
      )}
    </>
  )
}

export default ChannelCategoriesCards
