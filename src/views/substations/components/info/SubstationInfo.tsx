import { MouseEvent, type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { useParams } from 'react-router-dom'
import { FileTable, SubstationInfoControl } from '..'
import { CustomSlider, Error, Icon, Loader, Tab } from '../../../../components'
import { urlFile } from '../../../../constants'
import { useSubstation } from '../../../../hooks'
import './substationInfo.scss'

const SubstationInfo: FC = () => {
  const { id } = useParams()
  const { substation, error, isError, isLoading } = useSubstation(id)
  const backupsContent = substation?.files_backups?.length ? <FileTable files={substation.files_backups} /> : <p className='text-content text-center'>Пока бэкапов не добавлено!</p>
  const photosContent = substation?.files_photos_ps?.length ? <FileTable files={substation.files_photos_ps} /> : <p className='text-content text-center'>Пока фото не добавлено!</p>
  const otherContent = substation?.other_files?.length ? <FileTable files={substation.other_files} /> : <p className='text-content text-center'>Пока других файлов не добавлено!</p>
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

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  return (
    <div className="substation-info">
      <h1 className='title'>{substation?.fullNameSubstation}</h1>
      <SubstationInfoControl substation={substation} />
      <div className="substation-info__wrapper">
        <div className="substation-info__content">
          <p className='substation-info__text'>РЭС/ГП: </p>
          <span className='text-content'>{substation?.district?.name}</span>
          <p className='substation-info__text'>РДУ: </p>
          <span className='text-content'>{substation?.rdu ? 'Да' : 'Нет'}</span>
          <p className='substation-info__text'>Тип КП: </p>
          <span className='text-content'>{substation?.type_kp?.name}</span>
          <p className='substation-info__text'>Головной контроллер: </p>
          <span className='text-content'>{substation?.head_controller?.name}</span>
          <p className='substation-info__text'>Основной канал: </p>
          <span className='text-content'>{substation?.main_channel?.name}</span>
          <p className='substation-info__text'>Резервный канал: </p>
          <span className='text-content'>{substation?.backup_channel ? substation?.backup_channel.name : '-'}</span>
          <p className='substation-info__text'>Дополнительный канал: </p>
          <span className='text-content'>{substation?.additional_channel ? substation?.additional_channel?.name : '-'}</span>
          <p className='substation-info__text'>GSM оператор: </p>
          <span className='text-content'>{substation?.gsm?.name}</span>
          <p className='substation-info__text'>IP основного канала: </p>
          <span className='text-content'>{substation?.mainChannelIp ? substation?.mainChannelIp : '-'}</span>
          <p className='substation-info__text'>IP резервного канала: </p>
          <span className='text-content'>{substation?.backupChannelIp ? substation?.backupChannelIp : '-'}</span>
          <p className='substation-info__text'>Всего выполнено работ: </p>
          <span className="text-content">{substation?.numberCompletedWorks}</span>
        </div>
        <div className="substation-info__imgs">
          {substation?.files_photos_ps?.length ? (
            <CustomSlider>
              {substation.files_photos_ps.map(photo => (
                <div key={photo.id} data-src={`${urlFile}${photo.filePath}`} onClick={(e) => toggleFullscreen(e)} />
              ))}
            </CustomSlider>
          ) : (
            <Icon id='img-off' className='!w-96 !h-96' />
          )}
        </div>
      </div>

      <Tab tabs={[
        { id: 'backups', label: 'Backup', content: backupsContent, icon: <Icon id='database' /> },
        { id: 'photos', label: 'Фото ПС', content: photosContent, icon: <Icon id='img' /> },
        { id: 'other_files', label: 'Прочие файлы', content: otherContent, icon: <Icon id='files-folder' /> }
      ]} />
    </div>
  )
}

export default SubstationInfo
