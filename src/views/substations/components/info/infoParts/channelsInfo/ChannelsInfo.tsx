import { type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { ChannelInfo, CopyToClipboardButton } from '../../../../../../components'
import { ChannelControlMenu } from '../../../../../channel/components/cards/cardParts'
import { IPropsChannelsInfo } from '../partsInfo.interfaces'

const ChannelsInfo: FC<IPropsChannelsInfo> = ({ channels }) => {
	if (!channels?.length) return <p className='substation-info__section-text text-red-500'>Нет данных по каналам для отображения!</p>

	return (
		<div className="flex flex-col gap-3">
			<p className='text-xl text-center font-bold'>Информация по каналам</p>
			{channels.map(channel => (
				<div key={channel.id} className='substation-info__equipment-wrapper'>
					<div className='substation-info__equipment'>
						<p className='substation-info__text'>{channel.channel_category_short}: </p>
						<p className='text-content flex items-center gap-2'>
							{channel.channel_type}
						</p>
						{channel.ipAddress && (
							<>
								<p className='substation-info__text'>IP адрес канала: </p>
								<div className='flex items-center gap-2'>
									<CopyToClipboardButton
										content={channel.ipAddress}
										classNameBtn='btn-circle'
									/>
									<p className='text-content'>
										{channel.ipAddress}
									</p>
								</div>
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
