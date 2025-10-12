import { type FC } from 'react'
import { Button, Error, Icon, Loader, Modal, Tooltip } from '../..'
import { useModal, useTelemechanicsDeviceInfo } from '../../../hooks'
import TelemechanicsDeviceContent from './TelemechanicsDeviceContent'

const TelemechanicsDeviceInfo: FC<{ id: number }> = ({ id }) => {
	const { isModal, toggleModal } = useModal()
	const { data, error, isLoading, isError } = useTelemechanicsDeviceInfo(id, {
		enabled: isModal
	})
	const content = isLoading ? <Loader /> :
		isError ? <Error error={error} /> :
			<TelemechanicsDeviceContent telemechanicsDevice={data} />

	return (
		<>
			<Tooltip text="Информация об устройстве">
				<Button className='btn-circle' onClick={toggleModal}>
					<Icon id='view' />
				</Button>
			</Tooltip>
			<Modal
				visible={isModal}
				title='Информация об устройстве'
				onToggle={toggleModal}
				content={content}
			/>
		</>
	)
}
export default TelemechanicsDeviceInfo
