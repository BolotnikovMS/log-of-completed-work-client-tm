import { type FC } from 'react'
import { useChannelInfo, useModal } from '../../../../../../../hooks'
import { Button, Error, Icon, Loader, Modal } from '../../../../../../../components'
import ChannelInfoContent from './ChannelInfoContent'

const ChannelInfo: FC<{ channelId: number }> = ({ channelId }) => {
	const { isModal, toggleModal } = useModal()
	const { data, error, isLoading, isError } = useChannelInfo(channelId, {
		enabled: isModal
	})

	return (
		<>
			<Button className='btn-circle' onClick={toggleModal}>
				<Icon id='view' />
			</Button>
			<Modal
				visible={isModal}
				title='Информация о канале'
				onToggle={toggleModal}
				content={
					isLoading ? <Loader /> :
						isError ? <Error error={error} /> :
							<ChannelInfoContent channel={data} />
				}
			/>
		</>
	)
}

export default ChannelInfo
