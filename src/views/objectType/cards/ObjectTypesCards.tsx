import { useEffect, useState, type FC } from 'react'
import { Error, InfoMessage, Loader, SmallCard } from '../../../components'
import { useObjectTypes } from '../../../hooks'
import { CardControl } from './cardParts'

const ObjectTypesCards: FC = () => {
	const [page, setPage] = useState<number>(1)
	const { data, error, isError, isLoading } = useObjectTypes({ limit: 20, page })

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
					<div className='cards'>
						{data.data.map(objectType => (
							<SmallCard
								key={objectType.id}
								childrenContent={
									<p className='text-content'>{objectType.name}</p>
								}
								childrenControl={
									<CardControl data={objectType} />
								}
							/>
						))}
					</div>
				</div>
			)}
			{(!data?.data.length && !isLoading && !isError) && (
				<InfoMessage text='Пока добавленных типов объектов нет...' />
			)}
		</>
	)
}

export default ObjectTypesCards
