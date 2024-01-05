import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { useDeleteHeadController, useInfiniteHeadControllers, useModal } from '../../../../hooks'

import { HeadControllerForm } from '..'
import { IHeadController } from '../../../../interfaces'

export const HeadControllersCards: FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteHeadControllers({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [headController, setHeadController] = useState<IHeadController | null>(null)
  const { deleteHeadController } = useDeleteHeadController()
  const handleDelete = (id:number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteHeadController.mutate(id)
  }

  return (
    <>
      {(isError) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="cards">
          {data.pages.map(headControllers => (
            headControllers.data.map(headController => (
              <SmallCard
                key={headController.id}
                cardText={headController.name}
                childrenControl={
                  <>
                    <Button onClick={() => {toggleModal(), setHeadController(headController), setIsEdited(!isEdited)}}>
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
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<HeadControllerForm headController={headController} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}
