import { useEffect, useState, type FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChannelInfo, Error, Icon, InfoMessage, Loader, NumberRecords, Pagination, SmallCard, Tooltip } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useChannels } from '../../../../hooks'
import { ChannelControlMenu } from './cardParts'

const ChannelCards: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState<number>(Number(searchParams.get(EFilterParam.page)) || 1)
	const substationParam = searchParams.get(EFilterParam.substation)
	const channelTypeParam = searchParams.get(EFilterParam.channelType)
	const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
	const { data, error, isError, isLoading } = useChannels({ limit: 20, page, substation: substationParam, channelType: channelTypeParam, channelCategory: channelCategoryParam })

	useEffect(() => {
		if (data?.data.length === 0 && page !== 1) {
			setPage(page - 1)
		}

		searchParams.set(EFilterParam.page, page.toString())
		setSearchParams(searchParams)
	}, [data?.data.length, page, searchParams, setSearchParams])

	if (isError && error) return <Error error={error} />

	if (isLoading) return <Loader />

	return (
		<>
			<NumberRecords text='Всего каналов:' numberRecords={data?.meta.total} />
			{!!data?.data.length && (
				<div className='flex flex-col gap-2'>
					<div className='cards'>
						{data.data.map(channel => (
							<SmallCard
								key={channel.id}
								classContent='flex-col !items-start !gap-1'
								childrenContent={
									<>
										<p className='text-content'>
											{channel?.channel_category_short ?? 'Нет данных'}
											{' - '}
											{channel?.channel_type}
										</p>
										<Tooltip text='Подробный просмотр объекта'>
											<p className='text-content'>
												<Link to={pageConfig.getDynamicUrl(pageConfig.substationInfo, { id: channel.substationId })} className='flex items-center gap-1 font-bold'>
													<Icon id='link' />
													{channel?.substation ?? 'Нет данных'}
												</Link>
											</p>
										</Tooltip>
									</>
								}
								childrenControl={
									<>
										<ChannelInfo channelId={channel.id} />
										<ChannelControlMenu channelId={channel.id} />
									</>
								}
							/>
						))}
					</div>
					<Pagination page={page} meta={data.meta} setPage={setPage} />
				</div>
			)}
			{!data?.data.length && !isLoading && !isError && <InfoMessage text='Пока добавленных каналов нет...' />}
		</>
	)
}

export default ChannelCards
