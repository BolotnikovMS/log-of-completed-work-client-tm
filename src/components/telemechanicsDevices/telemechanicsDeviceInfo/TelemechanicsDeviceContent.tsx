import { type FC } from 'react'
import { ITelemechanicsDeviceInfo } from '../../../interfaces'
import { Group } from '../../group/Group'

const TelemechanicsDeviceContent: FC<{ telemechanicsDevice: ITelemechanicsDeviceInfo | undefined }> = ({ telemechanicsDevice }) => {
	if (!telemechanicsDevice) return <p className='text-content text-center !font-bold text-red-500'>Нет данных!</p>

	return (
		<div className='flex flex-col justify-center gap-1'>
			<Group>
				<p className='text-content-1'>
					Объект:
					<span className='text-content'>
						{telemechanicsDevice.substation}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>
					Тип КП:
					<span className='text-content'>
						{telemechanicsDevice.type_kp}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>
					Головной контроллер:
					<span className='text-content'>
						{telemechanicsDevice.head_controller}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>
					Версия прошивки контроллера:
					<span className='text-content'>
						{telemechanicsDevice.controllerFirmwareVersion ?? 'Не указана'}
					</span>
				</p>
			</Group>
			<Group>
				<p className='text-content-1'>
					Примечание:
					<span className='text-content'>
						{telemechanicsDevice.note ?? 'Не указано'}
					</span>
				</p>
			</Group>
		</div>
	)
}

export default TelemechanicsDeviceContent
