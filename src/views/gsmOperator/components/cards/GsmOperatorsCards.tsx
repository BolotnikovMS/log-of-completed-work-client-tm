import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, InfoMessage, Loader, Modal, SmallCard } from '../../../../components'
import { useDeleteGsmOperator, useGsmOperators, useModal } from '../../../../hooks'

import { GsmOperatorForm } from '..'
import { IGsmOperator } from '../../../../interfaces'

const GsmOperatorsCards: FC = () => {
  const { data, error, isError, isFetching } = useGsmOperators()
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [gsmOperator, setGsmOperator] = useState<IGsmOperator | null>(null)
  const { deleteGsmOperator } = useDeleteGsmOperator()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteGsmOperator.mutate(id)
  }

  return (
    <>
      {(isError) && <Error error={error}/>}
      {isFetching ? (<Loader />) : 
        (!!data?.length && (
          <div className="cards">
            {data.map(gsmOperator => (
              <SmallCard
                key={gsmOperator.id}
                cardText={gsmOperator.name}
                childrenControl={
                  <>
                    <Button onClick={() => {toggleModal(), setGsmOperator(gsmOperator), setIsEdited(!isEdited)}}>
                      <Pencil />
                    </Button>
                    <Button classBtn='btn-bg_red' onClick={() => handleDelete(gsmOperator.id)}>
                      <Trash2 />
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        ))
      }
			{(!data?.length && !isFetching && !isError) && <InfoMessage text='GSM операторов пока не добавлено...' />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<GsmOperatorForm gsmOperator={gsmOperator} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}

export default GsmOperatorsCards