import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { FileTable, SubstationInfoControl } from '..'
import { Error, Icon, Loader, Tab } from '../../../../components'
import { useSubstation } from '../../../../hooks'
import { ChannelsInfo, SliderPhoto, YtmInfo } from './infoParts'
import './substationInfo.scss'

const SubstationInfo: FC = () => {
  const { id } = useParams()
  const { substation, error, isError, isLoading } = useSubstation(id)
  const backupsContent = substation?.files_backups?.length ? <FileTable files={substation.files_backups} /> : <p className='text-content text-center'>Пока бэкапов не добавлено!</p>
  const photosContent = substation?.files_photos_ps?.length ? <FileTable files={substation.files_photos_ps} /> : <p className='text-content text-center'>Пока фото не добавлено!</p>
  const otherContent = substation?.other_files?.length ? <FileTable files={substation.other_files} /> : <p className='text-content text-center'>Пока других файлов не добавлено!</p>

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  return (
    <div className="substation-info">
      <h1 className='title'>{substation?.fullNameSubstation}</h1>
      <SubstationInfoControl substation={substation} />
      <div className="substation-info__wrapper">
        <div className="substation-info__content">
          <div className="substation-info__equipment-tm">
            <p className='substation-info__section-text'>Общая информация</p>
            <p className='substation-info__text'>РЭС/ГП: </p>
            <p className='text-content'>{substation?.district}</p>
            <p className='substation-info__text'>РДУ: </p>
            <p className='text-content'>{substation?.rdu ? 'Да' : 'Нет'}</p>
            <p className='substation-info__text'>Всего выполнено работ: </p>
            <p className="text-content">{substation?.numberCompletedWorks}</p>
            <YtmInfo substation={substation} />
          </div>
          <ChannelsInfo substation={substation} />
        </div>
        <SliderPhoto substation={substation} />
      </div>

      <Tab tabs={[
        { id: 'backups', label: 'Backup', content: backupsContent, icon: <Icon id='database' /> },
        { id: 'photos', label: 'Фото ПС', content: photosContent, icon: <Icon id='img' /> },
        { id: 'other_files', label: 'Прочие файлы', content: otherContent, icon: <Icon id='files-folder' /> }
      ]} />
    </div >
  )
}

export default SubstationInfo
