import { useEffect, useState, type FC } from 'react'
import { Error, InfoMessage, Loader, Pagination, SmallCard } from '../../../../components'
import { useTypesWork } from '../../../../hooks'
import { CardControl } from './cardParts'

const TypesWorkCards: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data, error, isError, isLoading } = useTypesWork({ limit: 20, page })

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
            {data.data.map(typeWork => (
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
            ))}
          </div>
          <Pagination page={page} meta={data.meta} setPage={setPage} />
        </div>
      )}
      {(!data?.data.length && !isLoading && !isError) && (
        <InfoMessage text='Пока добавленных категорий работ нет...' />
      )}
    </>
  )
}

export default TypesWorkCards
