import { Button, Error, LoadMore, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteHeadController, useInfiniteHeadControllers } from '../../../../hooks'

import React from 'react'
import { isAxiosError } from 'axios'

export const HeadControllersCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteHeadControllers({ limit: 10 })
  const { deleteHeadController } = useDeleteHeadController()
  const handleDelete = (id:number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteHeadController.mutate(id)
  }
  const handelEdit = (id:number) => {
    console.log(id);
    return
  }

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="cards">
          {data.pages.map(headControllers => (
            headControllers.data.map(headController => (
              <SmallCard
                key={headController.id}
                cardText={headController.name}
                childrenControl={
                  <>
                    <Button onClick={() => handelEdit(headController.id)}>
                      <Pencil />
                    </Button>              
                    <Button classBtn='btn-bg_red' onClick={() => handleDelete(headController.id)}>
                      <Trash2 />
                    </Button>              
                  </>
                }
              />
            ))
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}
