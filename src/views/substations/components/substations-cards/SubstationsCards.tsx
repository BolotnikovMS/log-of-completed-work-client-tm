import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Error, InfoMessage, Loader, NumberRecords, Pagination, SmallCard } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useSubstations } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'
import { CardContent, ControlMenu } from './cardParts'

const SubstationsCards: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState<number>(Number(searchParams.get(EFilterParam.page)) || 1)
	const searchParam = searchParams.get('search')
	const sortParam = searchParams.get('sort')
	const orderParam = searchParams.get('order')
	const districtParam = searchParams.get(EFilterParam.district)
	const typeKpParam = searchParams.get(EFilterParam.typeKp)
	const headControllerParam = searchParams.get(EFilterParam.headController)
	const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
	const channelTypeParam = searchParams.get(EFilterParam.channelType)
	const objectTypeParam = searchParams.get(EFilterParam.objectType)
	const { substations: data, error, isError, isLoading } = useSubstations({ limit: 20, page, search: searchParam, sort: sortParam, order: orderParam as TOrderSort, typeKp: typeKpParam, headController: headControllerParam, channelCategory: channelCategoryParam, channelType: channelTypeParam, district: districtParam, objectType: objectTypeParam })
	const memoizedSubstations = useMemo(() => data, [data])

	useEffect(() => {
		if (memoizedSubstations?.data.length === 0 && page !== 1) {
			setPage(page - 1)
		}

		searchParams.set(EFilterParam.page, page.toString())
		setSearchParams(searchParams)
	}, [memoizedSubstations?.data.length, page, searchParams, setSearchParams])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />

	return (
		<>
			<NumberRecords text='Всего объектов:' numberRecords={data?.meta.total} />
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
					<Pagination page={page} meta={memoizedSubstations.meta} setPage={setPage} />
				</div>
			)}
			{(!data?.data.length && !isLoading && !isError) && (
				<InfoMessage text='Объектов пока не добавлено...' />
			)}
		</>
	)
}

export default SubstationsCards
