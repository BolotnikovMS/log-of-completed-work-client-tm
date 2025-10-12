import { type FC } from 'react'
import { Button, Error, Icon, Loader, Modal, Tooltip } from '../..'
import { useChannelInfo, useModal } from '../../../hooks'
import ChannelInfoContent from './ChannelInfoContent'

const ChannelInfo: FC<{ channelId: number }> = ({ channelId }) => {
	const { isModal, toggleModal } = useModal()
	const { data, error, isLoading, isError } = useChannelInfo(channelId, {
		enabled: isModal
	})
	const content = isLoading ? <Loader /> :
		isError ? <Error error={error} /> :
			<ChannelInfoContent channel={data} />

	return (
		<>
			<Tooltip text='Информация о канале'>
				<Button className='btn-circle' onClick={toggleModal}>
					<Icon id='view' />
				</Button>
			</Tooltip>
			<Modal
				visible={isModal}
				title='Информация о канале'
				onToggle={toggleModal}
				content={content}
			/>
		</>
	)
}

export default ChannelInfo
