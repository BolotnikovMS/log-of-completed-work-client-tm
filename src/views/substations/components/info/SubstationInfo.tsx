import { MouseEvent, type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { useParams } from 'react-router-dom'
import { FileTable, SubstationInfoControl } from '..'
import { CustomSlider, Error, Loader, Tab } from '../../../../components'
import { urlFile } from '../../../../constants'
import { useSubstation } from '../../../../hooks'
import { Database, FilesFolder, Img, ImgOff } from '../../../../icons'
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
            <ImgOff width={400} height={400} />
          )}
        </div>
      </div>

      <Tab tabs={[
        { id: 'backups', label: 'Backup', content: backupsContent, icon: <Database className='icon' /> },
        { id: 'photos', label: 'Фото ПС', content: photosContent, icon: <Img className='icon' /> },
        { id: 'other_files', label: 'Прочие файлы', content: otherContent, icon: <FilesFolder className='icon' /> }
      ]} />
    </div>
  )
}

export default SubstationInfo

// <p className='substation-info__text'>РЭС/ГП: <span className='text-content'>{substation?.district?.name}</span></p>
// <p className='substation-info__text'>РДУ: <span className='text-content'>{substation?.rdu ? 'Да' : 'Нет'}</span></p>
// <p className='substation-info__text'>Тип КП: <span className='text-content'>{substation?.type_kp?.name}</span></p>
// <p className='substation-info__text'>Головной контроллер: <span className='text-content'>{substation?.head_controller?.name}</span></p>
// <p className='substation-info__text'>Основной канал: <span className='text-content'>{substation?.main_channel?.name}</span></p>
// {substation?.backup_channel && <p className='substation-info__text'>Резервный канал: <span className='text-content'>{substation?.backup_channel ? substation?.backup_channel.name : '-'}</span></p>}
// {substation?.additional_channel && <p className='substation-info__text'>Дополнительный канал: <span className='text-content'>{substation?.additional_channel.name}</span></p>}
// {substation?.gsm && <p className='substation-info__text'>GSM оператор: <span className='text-content'>{substation?.gsm?.name}</span></p>}
// {substation?.mainChannelIp && <p className='substation-info__text'>IP основного канала: <span className='text-content'>{substation?.mainChannelIp}</span></p>}
// {substation?.backupChannelIp && <p className='substation-info__text'>IP резервного канала: <span className='text-content'>{substation?.backupChannelIp}</span></p>}
// <p className='substation-info__text'>Всего выполнено работ: <span className="text-content">{substation?.numberCompletedWorks}</span></p>
