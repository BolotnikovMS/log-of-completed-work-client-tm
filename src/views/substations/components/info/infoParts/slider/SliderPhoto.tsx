import { MouseEvent, type FC } from 'react'
import { CustomSlider, Icon } from '../../../../../../components'
import { urlFile } from '../../../../../../constants'
import { IPropsPartsInfo } from '../partsInfo.interface'

const SliderPhoto: FC<IPropsPartsInfo> = ({ substation }) => {
  if (!substation) return <p className='substation-info__section-text text-red-500'>Нету данных для отображения!</p>
  const toggleFullscreen = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLDivElement

    if (target.requestFullscreen) {
      if (!document.fullscreenElement) {
        target.requestFullscreen().catch((err) => console.error('Error entering fullscreen:', err))
      } else {
        document.exitFullscreen().catch((err) => console.error('Error exiting fullscreen:', err))
      }
    } else {
      console.warn('Fullscreen API is not supported in this browser.')
    }
  }

  return (
    <div className="substation-info__imgs">
      {substation.files_photos_ps?.length ? (
        <CustomSlider>
          {substation.files_photos_ps.map(photo => (
            <div key={photo.id} data-src={`${urlFile}${photo.filePath}`} onClick={(e) => toggleFullscreen(e)} />
          ))}
        </CustomSlider>
      ) : (
        <Icon id='img-off' className='!w-96 !h-96' />
      )}
    </div>
  )
}

export default SliderPhoto
