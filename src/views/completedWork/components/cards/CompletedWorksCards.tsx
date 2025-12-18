import { useCallback, useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompletedWorkInfo } from '..'
import { Card, Error, InfoMessage, Loader, Modal, NumberRecords, Pagination } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useCompletedWorks, useModal } from '../../../../hooks'
import { ICompletedWorkList } from '../../../../interfaces'
import { CardContent, CardControl, CardFooter, CardHeader } from './cardParts'

const CompletedWorksCards: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState<number>(Number(searchParams.get(EFilterParam.page)) || 1)
	const substationParam = searchParams.get(EFilterParam.substation)
	const executorParam = searchParams.get(EFilterParam.executor)
	const dateStartParam = searchParams.get(EFilterParam.dateStart)
	const dateEndParam = searchParams.get(EFilterParam.dateEnd)
	const typeWorkParam = searchParams.get(EFilterParam.typeWork)
	const inControlParam = searchParams.get(EFilterParam.inControl)
	const { data, error, isError, isLoading } = useCompletedWorks({ limit: 15, page, substation: substationParam, executor: executorParam, dateStart: dateStartParam, dateEnd: dateEndParam, typeWork: typeWorkParam, inControl: inControlParam })
	const { isModal: isModalView, toggleModal: toggleModalView } = useModal()
	const [completedWork, setCompetedWork] = useState<ICompletedWorkList | null>(null)
	const handleOpenInfo = useCallback((work: ICompletedWorkList) => {
		toggleModalView()
		setCompetedWork(work)
	}, [toggleModalView])

	useEffect(() => {
		if (!data) return

		const { currentPage, lastPage, firstPage } = data.meta

		if (currentPage > lastPage) {
			setPage(1)

			return
		}

		if (firstPage !== lastPage && currentPage !== 1) {
			searchParams.set(EFilterParam.page, page.toString())
			setSearchParams(searchParams)
		} else {
			searchParams.delete(EFilterParam.page)
			setSearchParams(searchParams)
		}
	}, [data, page, searchParams, setSearchParams])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />

	return (
		<>
			<NumberRecords text='Всего записей:' numberRecords={data?.meta.total} />
			{!!data?.data.length && (
				<div className='flex flex-col gap-2'>
					<div className="cards-work">
						{data.data.map(completedWork => (
							<Card
								key={completedWork.id}
								classBody='!py-4'
								childrenHeader={
									<CardHeader
										substationId={completedWork.substationId}
										substationFullName={completedWork.substation}
										typeWork={completedWork.type_work}
										inControl={completedWork.inControl}
									/>
								}
								childrenContent={<CardContent description={completedWork.description} />}
								childrenFooter={
									<CardFooter
										dateCompletion={completedWork.dateCompletion}
										workProducerShortName={completedWork.work_producer}
									/>
								}
								childrenControl={
									<CardControl
										completedWork={completedWork}
									/>
								}
								onClick={() => handleOpenInfo(completedWork)}
							/>
						))}
					</div>
					<Pagination page={page} meta={data.meta} setPage={setPage} />
				</div>
			)}
			{(!data?.meta.total && !isLoading && !isError) && <InfoMessage text='Пока выполненных работ не добавлено...' />}
			{completedWork && (
				<Modal
					visible={isModalView}
					title='Подробный просмотр выполненной работы'
					classDialog='!min-w-[850px]'
					onToggle={() => { toggleModalView() }}
					content={<CompletedWorkInfo completedWorkId={completedWork.id} isModal={isModalView} />}
				/>
			)}
		</>
	)
}

export default CompletedWorksCards
