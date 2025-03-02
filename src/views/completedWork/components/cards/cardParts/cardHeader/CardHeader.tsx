import { memo, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Icon } from '../../../../../../components'
import { pageConfig } from '../../../../../../config/pages.config'
import { IPropsCardHeader } from './cardHeader.interface'

const CardHeader: FC<IPropsCardHeader> = memo(({ substationId, substationFullName, typeWork, inControl }) => {
	if (!substationId || !substationFullName || !typeWork) {
		return <p className='text-title text-red-500'>Заголовок не доступен</p>
	}

	return (
		<div className='flex items-center justify-between gap-2'>
			<p className='flex text-title font-bold' >
				<Link to={pageConfig.getDynamicUrl(pageConfig.substationInfo, { id: substationId })} className='flex items-center gap-1'>
					<Icon id='link' aria-label='Подробный просмотр объекта' />
					{substationFullName}
				</Link>
			</p>
			{
				inControl && <Badge text='Контроль' className='mBadge_orange' />
			}
			<Badge text={typeWork} className='mBadge_blue' />
		</div>
	)
})

export default CardHeader
