import moment from 'moment'
import { type FC } from 'react'
import { Error, Group, Loader } from '../../../../components'
import { useCompletedWorkInfo } from '../../../../hooks'
import './completedWork.scss'

const CompletedWorkInfo: FC<{ completedWorkId: number, isModal: boolean }> = ({ completedWorkId, isModal }) => {
	const { data: completedWork, error, isError, isLoading } = useCompletedWorkInfo(completedWorkId, {
		enabled: isModal
	})

	if (isLoading) return <Loader />
	if (isError) return <Error error={error} />

	return (
		<div className='work-info'>
			<div className='work-info__content'>
				<Group>
					<p className='text-content-1'>Объект:
						<span className='text-content'>
							{completedWork?.substation ?? 'Нет данных'}
						</span>
					</p>
				</Group>
				<Group>
					<p className='text-content-1'>Дата проведения работ:
						<span className='text-content'>
							{moment(completedWork?.dateCompletion, 'YYYY-MM-DD').format('DD.MM.yyyy')}
						</span>
					</p>
				</Group>
				<Group>
					<p className='text-content-1'>Категория работ:
						<span className='text-content'>
							{completedWork?.type_work ?? 'Нет данных'}
						</span>
					</p>
				</Group>
				<Group>
					<p className='text-content-1'>
						Производитель работ:
						<span className='text-content'>
							{completedWork?.work_producer ?? 'Нет данных'}
						</span>
					</p>
				</Group>
				<Group>
					<p className='text-content-1'>
						Автор записи:
						<span className='text-content'>
							{completedWork?.author ?? 'Нет данных'}
						</span>
					</p>
				</Group>
			</div>
			<div className='work-info__content'>
				<div className='work-info__titles'>
					<h2 className="text-title font-bold">Описание выполненной работы</h2>
				</div>
				<p className='text-content text-pretty'>{completedWork?.description}</p>
				{completedWork?.note && (
					<>
						<div className='work-info__titles mt-5'>
							<h2 className="text-title font-bold">Примечание</h2>
						</div>
						<p className='text-content text-pretty'>{completedWork.note}</p>
					</>
				)}
			</div>
		</div>
	)
}

export default CompletedWorkInfo
