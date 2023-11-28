import { Button, Error, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteHeadController, useInfiniteHeadControllers } from '../../../../hooks'

import React from 'react'
import { isAxiosError } from 'axios'

export const HeadControllersCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteHeadControllers({ limit: 10 })
  const { deleteHeadController } = useDeleteHeadController()
  const handleDelete = (id:number) => {
    const answer = confirm('Are you sure?')

    if (!answer) return null

    return deleteHeadController.mutate(id)
  }

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="headController__cards">
          {data.pages.map(headControllers => (
            headControllers.data.map(headController => (
              <SmallCard
                key={headController.id}
                cardText={headController.name}
                childrenControl={
                  <>
                    <Button>
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
      {hasNextPage && (
        <div className="headController__btns">
          <Button classBtn='btn-bg_blue' type='button' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage || isFetching ? 
              'Загрузка...' : 
              hasNextPage ?
              'Показать еще' :
              'Больше нет данных'
            }
          </Button>
        </div>
      )}
    </>
  )
}
