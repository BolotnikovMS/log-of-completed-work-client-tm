import { useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Error, Icon, InfoMessage, Loader, Pagination, SmallCard } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { useDistricts } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'
import { CardControl } from './cardParts'

const DistrictsCards: FC = () => {
	const [page, setPage] = useState<number>(1)
	const [searchParams] = useSearchParams()
	const sortParam = searchParams.get('sort') || 'name'
	const orderParam = searchParams.get('order') || 'asc'
	const { districts: data, error, isError, isLoading } = useDistricts({ limit: 15, page, sort: sortParam, order: orderParam as TOrderSort })

	useEffect(() => {
		if (data?.data.length === 0 && page !== 1) {
			setPage(page - 1)
		}
	}, [data?.data.length, page])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />

	return (
		<>
			{!!data?.data.length && (
				<div className='flex flex-col gap-2'>
					<div className="cards">
						{data.data.map(district => (
							<SmallCard
								key={district.id}
								childrenContent={
									<p className='text-content flex items-center gap-1'>
										<Icon id='link' />
										{district.name}
									</p>
								}
								path={pageConfig.getDynamicUrl(pageConfig.districtSubstations, { id: district.id })}
								childrenControl={
									<CardControl
										districtId={district.id}
									/>
								}
							/>
						))}
					</div>
					<Pagination page={page} meta={data.meta} setPage={setPage} />
				</div>
			)}
			{(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
		</>
	)
}

export default DistrictsCards

// export function useIntersection(onIntersect: () => void) {
//   const unsubscribe = useRef(() => {})

//   return useCallback((el: HTMLDivElement | null) => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(intersection => {
//         if (intersection.isIntersecting) {
//           onIntersect()
//         }
//       })
//     })

//     if (el) {
//       observer.observe(el)
//       unsubscribe.current = () => observer.disconnect()
//     } else {
//       unsubscribe.current()
//     }
//   }, [])
// }
