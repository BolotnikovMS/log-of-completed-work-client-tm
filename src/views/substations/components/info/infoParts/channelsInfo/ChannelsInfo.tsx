import { type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { ChannelControlMenu } from '../../../../../channel/components/cards/cardParts'
import { IPropsChannelsInfo } from '../partsInfo.interfaces'
import ChannelInfoNote from './ChannelInfoNote'

const ChannelsInfo: FC<IPropsChannelsInfo> = ({ channels }) => {
	if (!channels?.length) return <p className='substation-info__section-text text-red-500'>Нет данных по каналам для отображения!</p>

	return (
		<div className="flex flex-col gap-3">
			<p className='text-xl text-center font-bold'>Информация по каналам</p>
			{channels.map(channel => (
				<div key={channel.id} className='substation-info__channel-wrapper'>
					<div className='substation-info__channel'>
						<p className='substation-info__text'>{channel.channel_category_short}: </p>
						<p className='text-content flex items-center gap-2'>
							{channel.channel_type}
						</p>
						{channel.channel_equipment && (
							<>
								<p className='substation-info__text'>Оборудование: </p>
								<p className='text-content'>{channel.channel_equipment}</p>
							</>
						)}
						{channel.gsm_operator && (
							<>
								<p className='substation-info__text'>GSM оператор: </p>
								<p className='text-content'>{channel.gsm_operator}</p>
							</>
						)}
						{channel.ipAddress && (
							<>
								<p className='substation-info__text'>IP адрес канала: </p>
								<p className='text-content'>{channel.ipAddress}</p>
							</>
						)}
						{channel.note && (
							<ChannelInfoNote channel={channel} />
						)}
					</div>
					<div className="w-none">
						<ChannelControlMenu channel={channel} />
					</div>
				</div>
			))
			}
		</div >
	)
}

export default ChannelsInfo
