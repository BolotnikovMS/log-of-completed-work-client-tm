import { memo, type FC } from 'react'
import { Group } from '../..'
import { TChannelInfo } from '../../../types'

const ChannelInfoContent: FC<{ channel: TChannelInfo | undefined }> = memo(({ channel }) => {
	if (!channel) return <p className='text-content text-center !font-bold text-red-500'>Нет данных!</p>

	return (
		<div className='flex flex-col justify-center gap-1'>
			<Group>
				<p className='text-content-1'>Объект:
					<span className='text-content'>
						{channel.substation}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Категория канала:
					<span className='text-content'>
						{channel.channel_category}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Тип канала:
					<span className='text-content'>
						{channel.channel_type}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>GSM оператор:
					<span className='text-content'>
						{channel.gsm_operator ?? 'Не указан'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Каналообразующее оборудование:
					<span className='text-content'>
						{channel.channel_equipment ?? 'Не указан'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>IP адрес канала:
					<span className='text-content'>
						{channel.ipAddress ?? 'Не указан'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Примечание:
					<span className='text-content'>
						{channel.note ?? 'Не указано'}
					</span>
				</p>
			</Group>
		</div>
	)
})

export default ChannelInfoContent
