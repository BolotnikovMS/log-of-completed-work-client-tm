import { useMemo, type FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Error, InfoMessage, Loader, NumberRecords, SmallCard } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { useDistrictSubstations } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'
import { CardContent, ControlMenu } from '../../../substations/components/substations-cards/cardParts'

const DistrictSubstationCards: FC = () => {
	const { id } = useParams()
	const [searchParams] = useSearchParams()
	const searchParam = searchParams.get('search')
	const sortParam = searchParams.get('sort')
	const orderParam = searchParams.get('order')
	const typeKpParam = searchParams.get('typeKp')
	const headControllerParam = searchParams.get('headController')
	const { substations, error, isError, isLoading } = useDistrictSubstations({ id, search: searchParam, sort: sortParam, order: orderParam as TOrderSort, typeKp: typeKpParam, headController: headControllerParam })
	const memoizedSubstations = useMemo(() => substations, [substations])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />

	return (
		<>
			<NumberRecords text='Всего объектов:' numberRecords={substations?.length} />
			{!!memoizedSubstations?.length && (
				<div className="cards">
					{memoizedSubstations.map(substation => (
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
						/>))
					}
				</div>
			)}
			{(!substations?.length && !isLoading && !isError) && <InfoMessage text='Объектов пока не добавлено...' />}
		</>
	)
}

export default DistrictSubstationCards
