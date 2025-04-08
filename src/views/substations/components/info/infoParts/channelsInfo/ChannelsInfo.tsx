import { type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { Link } from 'react-router-dom'
import { ChannelControlMenu } from '../../../../../channel/components/cards/cardParts'
import { IPropsChannelsInfo } from '../partsInfo.interfaces'
import { ChannelInfo, Tooltip } from '../../../../../../components'

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
						{channel.ipAddress && (
							<>
								<p className='substation-info__text'>IP адрес канала: </p>
								<Tooltip text='Открыть в новом окне'>
									<p className='text-content'>
										<Link to={`http://${channel.ipAddress}`} target='_blank' rel="noopener noreferrer">
											{channel.ipAddress}
										</Link>
									</p>
								</Tooltip>
							</>
						)}
					</div>
					<div className="w-none flex flex-col gap-1">
						<ChannelInfo channelId={channel.id} />
						<ChannelControlMenu channelId={channel.id} />
					</div>
				</div>
			))
			}
		</div >
	)
}

export default ChannelsInfo
