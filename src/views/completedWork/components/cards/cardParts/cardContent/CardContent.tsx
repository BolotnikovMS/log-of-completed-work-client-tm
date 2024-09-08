import { memo, type FC } from 'react'
import { IPropsCardContent } from './cardContent.interface'

const CardContent: FC<IPropsCardContent> = memo(({ shortText }) => {
  if (!shortText) {
    return <p className='text-title text-red-500'>Описание не доступно</p>
  }

  return (
    <p className='text-content'>{shortText}</p>
  )
})

export default CardContent
