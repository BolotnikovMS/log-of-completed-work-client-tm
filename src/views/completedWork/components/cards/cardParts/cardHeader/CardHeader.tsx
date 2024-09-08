import { memo, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../../../components'
import { IPropsCardHeader } from './cardHeader.interface'

const CardHeader: FC<IPropsCardHeader> = memo(({ substationId, substationFullName }) => {
  if (!substationId || !substationFullName) {
    return <p className='text-title text-red-500'>Заголовок не доступен</p>
  }

  return (
    <p className='flex text-title font-bold' >
      <Link to={`/substations/${substationId}`} className='flex items-center gap-1'>
        <Icon id='link' />
        {substationFullName}
      </Link>
    </p>
  )
})

export default CardHeader
