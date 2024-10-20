import { memo, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Icon } from '../../../../../../components'
import { IPropsCardHeader } from './cardHeader.interface'

const CardHeader: FC<IPropsCardHeader> = memo(({ substationId, substationFullName, typeWork }) => {
  if (!substationId || !substationFullName || !typeWork) {
    return <p className='text-title text-red-500'>Заголовок не доступен</p>
  }

  return (
    <div className='flex items-center justify-between gap-2'>
      <p className='flex text-title font-bold' >
        <Link to={`/substations/${substationId}`} className='flex items-center gap-1'>
          <Icon id='link' />
          {substationFullName}
        </Link>
      </p>
      <Badge text={typeWork} className='mBadge_blue' />
    </div>
  )
})

export default CardHeader
