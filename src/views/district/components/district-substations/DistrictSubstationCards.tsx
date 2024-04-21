import { Button, Error, InfoMessage, Loader, Modal, SmallCard } from '../../../../components'

import { isAxiosError } from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { useDeleteSubstation, useDistrictSubstations, useModal } from '../../../../hooks'
import { ISubstation } from '../../../../interfaces'
import { SubstationForm } from '../../../substations/components'

const DistrictSubstationCards: FC = () => {
  const { id } = useParams()
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const { substations, error, isError, isLoading } = useDistrictSubstations(id)
  const [substationData, setSubstation] = useState<ISubstation | null>(null)
  const { deleteSubstation } = useDeleteSubstation()
	const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteSubstation.mutate(id)
  }

  return (
    <>
      {isLoading && <Loader />}
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!substations?.length && (
        <div className="cards">
          {substations.map(substation => (
						<SmallCard 
							key={substation.id} 
							cardText={substation.fullNameSubstation} 
							path={`/substations/${substation.id}`}
							childrenControl={
								<>
									<Button onClick={() => {toggleModal(), setSubstation(substation), setIsEdited(!isEdited) }}>
										<Pencil />
									</Button>
									<Button classBtn='btn-bg_red' onClick={() => handleDelete(substation.id)}>
										<Trash2 />
									</Button>
								</>
							}
						/>))
					}
        </div>
      )}
      {(!substations?.length && !isLoading && !isError) && <InfoMessage text='Подстанций пока не добавлено...' />}
			<Modal visible={isModal} title='Редактирование' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<SubstationForm substation={substationData} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}

export default DistrictSubstationCards