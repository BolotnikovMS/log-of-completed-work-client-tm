import { useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CardsSubstations } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useSubstations } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'

const SubstationsCards: FC = () => {
	const [searchParams] = useSearchParams()
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

	return (
		<CardsSubstations substations={data} error={error} isError={isError} isLoading={isLoading} page={page} setPage={setPage} />
	)
}

export default SubstationsCards
