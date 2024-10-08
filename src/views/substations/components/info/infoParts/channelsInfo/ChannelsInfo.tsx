import { type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { ChannelControlMenu } from '../../../../../channel/components/cards/cardParts'
import { IPropsPartsInfo } from '../partsInfo.interface'

const ChannelsInfo: FC<IPropsPartsInfo> = ({ substation }) => {
  if (!substation?.channels?.length) return <p className='substation-info__section-text text-red-500'>Нету данных по каналам для отображения!</p>

  return (
    <div className="flex flex-col gap-3">
      <p className='text-xl text-center font-bold'>Информация по каналам</p>
      {substation.channels?.map(channel => (
        <div key={channel.id} className='substation-info__channel'>
          <p className='substation-info__text'>{channel.channel_category?.name}: </p>
          <span className='text-content flex items-center gap-2'>
            {channel.channel_type?.name}
            <ChannelControlMenu channel={channel} />
          </span>
          {channel.ipAddress && (
            <>
              <p className='substation-info__text'>IP адрес канала: </p>
              <span className='text-content'>{channel.ipAddress}</span>
            </>
          )}
          {channel.note && (
            <>
              <p className='substation-info__text'>Примечание: </p>
              <span className='text-content'>{channel.note}</span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChannelsInfo
