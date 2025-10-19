import { memo, type FC } from 'react'
import { Badge, Icon } from '../../../..'
import { ICardContent } from './cardContent.interface'

const CardContent: FC<ICardContent> = memo(({ substation }) => {
	return (
		<>
			<div className="p-1 flex flex-wrap items-center gap-2">
				<Badge text={substation.object_type!} className='mBadge_blue' />
				{substation.rdu && <Badge text='РДУ' className='mBadge_red' />}
				{substation.telemechanics_devices && substation.telemechanics_devices.map(typeKp => (
					<Badge key={typeKp.id} text={typeKp.type_kp} className='mBadge_light_green' />
				))}
			</div>
			<p className='text-content flex items-center gap-1'>
				<Icon id='link' />
				{substation.fullNameSubstation}
			</p>
		</>
	)
})

export default CardContent
