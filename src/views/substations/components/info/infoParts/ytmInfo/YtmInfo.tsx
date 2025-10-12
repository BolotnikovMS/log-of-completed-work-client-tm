import { type FC } from 'react'
import { TelemechanicsDeviceInfo } from '../../../../../../components'
import { TelemechanicDeviceMenu } from '../../../../../telemechanicDevice/components/cards/cardParts'
import { IPropsTelemechanicDevice } from '../partsInfo.interfaces'

const YtmInfo: FC<IPropsTelemechanicDevice> = ({ telemechanics_devices }) => {
	if (!telemechanics_devices.length)
		return (
			<p className='substation-info__section-text text-red-500'>
				Нет данных по УТМ для отображения!
			</p>
		)

	return (
		<>
			<div className='flex flex-col gap-3'>
				<p className='substation-info__section-text'>Информация по УТМ</p>
				{telemechanics_devices.map((device, i) => (
					<div key={device.id}>
						{telemechanics_devices.length > 1 && (
							<p className='substation-info mb-2 text-center font-bold text-lg'>
								УТМ: {i + 1}
							</p>
						)}
						<div className='substation-info__equipment-wrapper'>
							<div className='substation-info__equipment'>
								<p className='substation-info__text'>
									Тип КП:
								</p>
								<p className='text-content flex items-center gap-2'>
									{device.type_kp}
								</p>
								<p className='substation-info__text'>
									Головной контроллер:
								</p>
								<p className='text-content flex items-center gap-2'>
									{device.head_controller}
								</p>
							</div>
							<div className='w-none flex flex-col gap-1'>
								<TelemechanicsDeviceInfo id={device.id} />
								<TelemechanicDeviceMenu deviceId={device.id} />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default YtmInfo;
