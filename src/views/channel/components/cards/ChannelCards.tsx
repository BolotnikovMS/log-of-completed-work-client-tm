import { type FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Error, Icon, InfoMessage, Loader, LoadMore, SmallCard } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useInfiniteChannels } from '../../../../hooks/channels/useInfiniteChannels'
import { ChannelControlMenu } from './cardParts'

const ChannelCards: FC = () => {
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get(EFilterParam.substation)
  const channelTypeParam = searchParams.get(EFilterParam.channelType)
  const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteChannels({ limit: 20, substation: substationParam, channelType: channelTypeParam, channelCategory: channelCategoryParam })

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      {!!data?.pages[0].data.length && (
        <div className='cards'>
          {data.pages.map(channelsData => (
            channelsData.data.map(channel => (
              <SmallCard
                key={channel.id}
                childrenContent={
                  <p className='text-content'>
                    {channel.channel_category?.name}
                    {' - '}
                    <Link to={`/substations/${channel.substationId}`} className='flex items-center gap-1 font-bold'>
                      <Icon id='link' />
                      {channel.substation?.fullNameSubstation}
                    </Link>
                  </p>
                }
                childrenControl={
                  <ChannelControlMenu channel={channel} />
                }
              />
            ))
          ))}
        </div>
      )}
      {(!data?.pages[0].data.length && !isFetching && !isError) && (
        <InfoMessage text='Пока не добавлено каналов...' />
      )}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default ChannelCards
