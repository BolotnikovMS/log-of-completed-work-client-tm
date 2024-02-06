import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { useDeleteTypeKp, useInfiniteTypesKp, useModal } from '../../../../hooks'

import { TypeKpForm } from '..'
import { ITypeKp } from '../../../../interfaces'

const TypesKpCards: FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesKp({ limit: 3 })
	console.log('data: ', data);
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [typeKp, setDistrict] = useState<ITypeKp | null>(null)
  const { deleteTypeKp } = useDeleteTypeKp()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteTypeKp.mutate(id)
  }

  return (
    <>
      {(isError) && <Error error={error}/>}
      {isFetching ? (<Loader />) :
        (!!data?.pages[0].data.length && (
          <div className="cards">
            {data.pages.map(typesKp => (
              typesKp.data.map(typeKp => (
                <SmallCard
                  key={typeKp.id}
                  cardText={typeKp.name}
                  childrenControl={
                    <>
                      <Button onClick={() => {toggleModal(), setDistrict(typeKp), setIsEdited(!isEdited)}}>
                        <Pencil />
                      </Button>              
                      <Button classBtn='btn-bg_red' onClick={() => handleDelete(typeKp.id)}>
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
			{(!data?.pages[0].data.length && !isFetching && !isError) && <InfoMessage text='Типов КП пока не добавлено...' />}
			{hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
			<Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<TypeKpForm typeKp={typeKp} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />}/>
    </>
  )
}

export default TypesKpCards