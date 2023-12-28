import { isAxiosError } from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import { type FC } from 'react'
import { Button, Error, InfoMessage, LoadMore, Loader, SmallCard } from '../../../../components'
import { useDeleteCompletedWork, useModal } from '../../../../hooks'
import { useInfiniteCompletedWork } from '../../../../hooks/completed-works/useInfiniteCompletedWork'

export const CompletedWorksCard: FC = () => {
	const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteCompletedWork({ limit: 15 })
  const { isModal, toggleModal } = useModal()
	const { deleteCompletedWork } = useDeleteCompletedWork()
	const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteCompletedWork.mutate(id)
  }

	return (
		<>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {isFetching ? (<Loader />) : 
        (!!data?.pages.length && (
          <div className="cards">
            {data.pages.map(completedWorks => (
              completedWorks.data.map(completedWork => (
                <SmallCard
                  key={completedWork.id}
                  cardText={completedWork.description}
									childrenFooter={completedWork.note}
                  childrenControl={
                    <>
                      <Button>
                        <Pencil />
                      </Button>
                      <Button classBtn='btn-bg_red' onClick={() => handleDelete(completedWork.id)}>
                        <Trash2 />
                      </Button>
                    </>
                  }
                />
              ))
            ))}
          </div>
        ))
      }
			{(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Пока нет выполненных работ по ПС...' />}
			{hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
		</>
	)
}
