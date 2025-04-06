import { memo, type FC } from 'react'
import { TChannelInfo } from '../../../../../../../types'
import { Group } from '../../../../../../../components'

const ChannelInfoContent: FC<{ channel: TChannelInfo | undefined }> = memo(({ channel }) => {
	if (!channel) return <p className='text-content text-center !font-bold text-red-500'>Нет данных!</p>

	return (
		<div className='flex flex-col justify-center gap-1'>
			<Group>
				<p className='text-content-1'>Объект:
					<span className='text-content'>
						{channel?.substation ?? 'Нет данных'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Категория канала:
					<span className='text-content'>
						{channel?.channel_category ?? 'Нет данных'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Тип канала:
					<span className='text-content'>
						{channel?.channel_type ?? 'Нет данных'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Каналообразующее оборудование:
					<span className='text-content'>
						{channel?.channel_equipment ?? 'Нет данных'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>IP адрес канала:
					<span className='text-content'>
						{channel?.ipAddress ?? 'Нет данных'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>Примечания:
					<span className='text-content'>
						{channel?.note ?? 'Нет данных'}
					</span>
				</p>
			</Group>
		</div>
	)
})

export default ChannelInfoContent
