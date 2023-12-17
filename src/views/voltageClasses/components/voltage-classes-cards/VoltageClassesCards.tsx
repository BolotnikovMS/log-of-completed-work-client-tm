import { Button, Error, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDeleteVoltageClass, useInfiniteVoltageClasses, useModal } from '../../../../hooks'

import { IVoltageClass } from '../../../../interfaces'
import { VoltageClassForm } from '..'
import { isAxiosError } from 'axios'

export const VoltageClassesCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [voltageClass, setVoltageClass] = useState<IVoltageClass | null>(null)
  const { deleteVoltageClass } = useDeleteVoltageClass()
  const handleDelete = (id:number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteVoltageClass.mutate(id)
  }
  
  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {isFetching ? (<Loader />) : 
        (!!data?.pages.length && (
          <div className="cards">
            {data.pages.map(voltageClasses => (
              voltageClasses.data.map(voltageClass => (
                <SmallCard
                  key={voltageClass.id}
                  cardText={voltageClass.name}
                  childrenControl={
                    <>
                      <Button onClick={() => {toggleModal(), setVoltageClass(voltageClass), setIsEdited(!isEdited)}}>
                        <Pencil />
                      </Button>
                      <Button classBtn='btn-bg_red' onClick={() => handleDelete(voltageClass.id)}>
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
      {isFetching && <Loader />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<VoltageClassForm voltageClass={voltageClass} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />}/>
    </>
  )
}
