import { useEffect, useMemo, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Error, InfoMessage, Loader, NumberRecords, Pagination, SmallCard } from '../..'
import { pageConfig } from '../../../config/pages.config'
import { EFilterParam } from '../../../enums/filterParam.enums'
import { CardContent, ControlMenu } from './cardParts'
import { IPropsCardsSubstations } from './cardsSubstations.interface'

const CardsSubstations: FC<IPropsCardsSubstations> = ({ substations, error, isError, isLoading, page, setPage }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const memoizedSubstations = useMemo(() => substations, [substations])

	useEffect(() => {
		if (!page || !setPage) return
		if (memoizedSubstations?.data.length === 0 && page !== 1) {
			setPage(page - 1)

			return
		}

		if (memoizedSubstations?.meta.first_page !== memoizedSubstations?.meta.last_page && memoizedSubstations?.meta.current_page !== 1) {
			searchParams.set(EFilterParam.page, page.toString())
			setSearchParams(searchParams)
		} else {
			searchParams.delete(EFilterParam.page)
			setSearchParams(searchParams)
		}
	}, [memoizedSubstations?.data.length, memoizedSubstations?.meta.current_page, memoizedSubstations?.meta.first_page, memoizedSubstations?.meta.last_page, page, searchParams, setPage, setSearchParams])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />

	return (
		<>
			<NumberRecords text='Всего объектов:' numberRecords={memoizedSubstations?.meta.total} />
			{!!memoizedSubstations?.data.length && (
				<div className='flex flex-col gap-2'>
					<div className="cards">
						{memoizedSubstations.data.map(substation => (
							<SmallCard
								key={substation.id}
								classContent='!block'
								childrenContent={
									<CardContent substation={substation} />
								}
								path={pageConfig.getDynamicUrl(pageConfig.substationInfo, { id: substation.id })}
								childrenControl={
									<ControlMenu substationId={substation.id} />
								}
							/>
						))}
					</div>
					{(page && setPage) && <Pagination page={page} meta={memoizedSubstations.meta} setPage={setPage} />}
				</div>
			)}
			{(!memoizedSubstations?.data.length && !isLoading && !isError) && (<InfoMessage text='Объектов не добавлено...' />)}
		</>
	)
}

export default CardsSubstations
