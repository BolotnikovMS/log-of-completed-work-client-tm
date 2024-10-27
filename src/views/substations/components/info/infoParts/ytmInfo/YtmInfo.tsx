import { type FC } from 'react'
import { IPropsPartsInfo } from '../partsInfo.interface'

const YtmInfo: FC<IPropsPartsInfo> = ({ substation }) => {
  if (!substation) return <p className='substation-info__section-text text-red-500'>Нету данных для отображения!</p>

  return (
    <>
      <p className='substation-info__section-text'>Информация по УТМ</p>
      <p className='substation-info__text'>Тип КП: </p>
      <span className='text-content'>{substation?.type_kp ?? 'Нет даннных'}</span>
      <p className='substation-info__text'>Головной контроллер: </p>
      <span className='text-content'>{substation?.head_controller ?? 'Нет даннных'}</span>
    </>
  )
}

export default YtmInfo
