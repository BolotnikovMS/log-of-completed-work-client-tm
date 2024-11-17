import { useEffect, useState, type FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Error, Icon, InfoMessage, Loader, Pagination, SmallCard } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useChannels } from '../../../../hooks'
import { ChannelControlMenu } from './cardParts'

const ChannelCards: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get(EFilterParam.substation)
  const channelTypeParam = searchParams.get(EFilterParam.channelType)
  const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
  const { data, error, isError, isLoading } = useChannels({ limit: 20, page, substation: substationParam, channelType: channelTypeParam, channelCategory: channelCategoryParam })

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
            {data.data.map(channel => (
              <SmallCard
                key={channel.id}
                childrenContent={
                  <p className='text-content'>
                    {channel?.channel_category_short ?? 'Нет данных'}
                    {' - '}
                    {channel?.channel_type}
                    <Link to={pageConfig.getDynamicUrl(pageConfig.substation, { id: channel.substationId })} className='flex items-center gap-1 font-bold'>
                      <Icon id='link' />
                      {channel?.substation ?? 'Нет данных'}
                    </Link>
                  </p>
                }
                childrenControl={
                  <ChannelControlMenu channel={channel} />
                }
              />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} setPage={setPage} />
        </div>
      )}
      {(!data?.data.length && !isLoading && !isError) && (
        <InfoMessage text='Пока добавленных каналов нет...' />
      )}
    </>
  )
}

export default ChannelCards
