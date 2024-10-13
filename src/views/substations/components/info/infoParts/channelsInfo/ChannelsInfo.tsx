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
          <p className='text-content flex items-center gap-2'>
            {channel.channel_type?.name}
            <ChannelControlMenu channel={channel} />
          </p>
          {channel.channel_equipment && (
            <>
              <p className='substation-info__text'>Оборудование: </p>
              <p className='text-content'>{channel.channel_equipment.name}</p>
            </>
          )}
          {channel.gsm_operator && (
            <>
              <p className='substation-info__text'>GSM оператор: </p>
              <p className='text-content'>{channel.gsm_operator.name}</p>
            </>
          )}
          {channel.ipAddress && (
            <>
              <p className='substation-info__text'>IP адрес канала: </p>
              <p className='text-content'>{channel.ipAddress}</p>
            </>
          )}
          {channel.note && (
            <>
              <p className='substation-info__text'>Примечание: </p>
              <p className='text-content text-pretty'>{channel.note}</p>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChannelsInfo
