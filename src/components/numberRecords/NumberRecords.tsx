import { memo, type FC } from 'react'
import { IPropsNumberRecords } from './numberRecords.interface'

const NumberRecords: FC<IPropsNumberRecords> = memo(({ text, numberRecords }) => {
  return (
    <div className='flex items-center gap-1 text-title py-3'>
      {text}
      <span className='font-bold'>{numberRecords ?? 'Нет данных'}</span>
    </div>
  )
})

export default NumberRecords
