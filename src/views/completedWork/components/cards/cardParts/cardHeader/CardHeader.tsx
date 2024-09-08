import { memo, type FC } from 'react'
import { Link } from 'react-router-dom'
import { LinkIcon } from '../../../../../../icons'
import { IPropsCardHeader } from './cardHeader.interface'

const CardHeader: FC<IPropsCardHeader> = memo(({ substationId, substationFullName }) => {
  if (!substationId || !substationFullName) {
    return <p className='text-title text-red-500'>Заголовок не доступен</p>
  }

  return (
    <p className='flex text-title font-bold' >
      <Link to={`/substations/${substationId}`} className='flex items-center gap-1'>
        <LinkIcon className='icon' />
        {substationFullName}
      </Link>
    </p>
  )
})

export default CardHeader
