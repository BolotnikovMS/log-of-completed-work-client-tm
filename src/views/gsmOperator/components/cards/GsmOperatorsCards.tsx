import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Error, InfoMessage, Loader, Modal, SmallCard } from '../../../../components'
import { useDeleteGsmOperator, useGsmOperators, useModal } from '../../../../hooks'

import { GsmOperatorForm } from '..'
import { checkRole, ERoles } from '../../../../helpers/checkRole.helper'
import { IGsmOperator } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const GsmOperatorsCards: FC = () => {
	const { authUser } = useAuthStore()
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

	if (isError && error) return <Error error={error}/>

	if (isFetching) return <Loader />

  return (
    <>
      {!!data?.length && (
				<div className="cards">
					{data.map(gsmOperator => (
						<SmallCard
							key={gsmOperator.id}
							cardText={gsmOperator.name}
							childrenControl={
								<>
									{
										checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
											<Button onClick={() => {toggleModal(), setGsmOperator(gsmOperator), setIsEdited(!isEdited)}}>
												<Pencil />
											</Button>
										)
									}
									{
										checkRole(authUser, [ERoles.Admin]) && (
											<Button classBtn='btn-bg_red' onClick={() => handleDelete(gsmOperator.id)}>
												<Trash2 />
											</Button>
										)
									}
								</>
							}
						/>
					))}
				</div>
			)}
			{(!data?.length && !isFetching && !isError) && <InfoMessage text='GSM операторов пока не добавлено...' />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<GsmOperatorForm gsmOperator={gsmOperator} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}

export default GsmOperatorsCards