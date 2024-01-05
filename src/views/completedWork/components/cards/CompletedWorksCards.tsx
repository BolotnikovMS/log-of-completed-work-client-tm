import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { CompletedWorkForm } from '..'
import { Button, Card, Error, InfoMessage, LoadMore, Loader, Modal } from '../../../../components'
import { useDeleteCompletedWork, useModal } from '../../../../hooks'
import { useInfiniteCompletedWork } from '../../../../hooks/completed-works/useInfiniteCompletedWork'
import { ICompletedWork } from '../../../../interfaces'

export const CompletedWorksCards: FC = () => {
	const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteCompletedWork({ limit: 15 })
	const { isModal, toggleModal } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [completedWork, setCompetedWork] = useState<ICompletedWork | null>(null)
	const { deleteCompletedWork } = useDeleteCompletedWork()
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')
		
		if (!answer) return null

		return deleteCompletedWork.mutate(id)
  }

	return (
		<>
      {(isError) && <Error error={error}/>}
      {isFetching ? (<Loader />) : 
        (!!data?.pages.length && (
          <div className="cards">
            {data.pages.map(completedWorks => (
              completedWorks.data.map(completedWork => (
								<Card
									key={completedWork.id}
									childrenHeader={<p className='card__text card__text-bold'>{completedWork.substation.fullNameSubstation}</p>}
									childrenBody={<p>{completedWork.description}</p>}
									childrenFooter={<p>Дата работ: {format(completedWork.dateCompletion, 'dd.MM.yyyy')}. Выполнил: {completedWork.work_producer.shortUserName} </p>}
									childrenControl={
										<>
											<Button onClick={() => {toggleModal(), setCompetedWork(completedWork), setIsEdited(!isEdited)}}>
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
			<Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<CompletedWorkForm completedWork={completedWork} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
		</>
	)
}
