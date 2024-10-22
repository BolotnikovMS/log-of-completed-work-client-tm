import { memo, type FC } from 'react'
import { IPropsCardContent } from './cardContent.interface'

const CardContent: FC<IPropsCardContent> = memo(({ description }) => {
  if (!description) {
    return <p className='text-title text-red-500'>Описание не доступно</p>
  }

  return (
    <p className='text-content'>{description.length >= 90 ? description.slice(0, 90) + '...' : description}</p>
  )
})

export default CardContent
