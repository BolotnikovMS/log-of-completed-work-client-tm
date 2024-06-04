import { ArrowLeft, BookTextIcon, ImageOff } from 'lucide-react'
import { type FC } from 'react'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FileTable } from '..'
import { Button, CustomSlider, Error, Loader, Tab } from '../../../../components'
import { urlFile } from '../../../../constants'
import { useSubstation } from '../../../../hooks'
import './info.scss'

const SubstationInfo: FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { substation, error, isError, isLoading } = useSubstation(id)
	const backupsContent = substation?.files_backups?.length ?	<FileTable files={substation.files_backups} /> : <p className='text text-center text-pad'>Пока бэкапов не добавлено!</p>
	const photosContent = substation?.files_photos_ps?.length ? <FileTable files={substation.files_photos_ps} /> : <p className='text text-center text-pad'>Пока фото не добавлено!</p>
	const otherContent = substation?.other_files?.length ? <FileTable files={substation.other_files}/> : <p className='text text-center text-pad'>Пока других файлов не добавлено!</p>

	if (isError && error) return <Error error={error}/>

	if (isLoading) return <Loader />

	return (
		<div className="info info-mt">
			<h1 className='title'>{substation?.fullNameSubstation}</h1>
			<div className="info__wrapper">
				<div className="info__content">
					<p className='text'>РЭС/ГП: <span className='sub-text'>{substation?.district?.name}</span></p>
					<p className='text'>РДУ: <span className='sub-text'>{substation?.rdu ? 'Да' : 'Нет'}</span></p>
					<p className='text'>Тип КП: <span className='sub-text'>{substation?.type_kp?.name}</span></p>
					<p className='text'>Головной контроллер: <span className='sub-text'>{substation?.head_controller?.name}</span></p>
					<p className='text'>Основной канал: <span className='sub-text'>{substation?.main_channel?.name}</span></p>
					{substation?.backup_channel &&  <p className='text'>Резервный канал: <span className='sub-text'>{substation?.backup_channel ? substation?.backup_channel.name : '-' }</span></p>}
					{substation?.additional_channel && <p className='text'>Дополнительный канал: <span className='sub-text'>{substation?.additional_channel.name}</span></p>}
					{substation?.gsm && <p className='text'>Gsm оператор: <span className='sub-text'>{substation?.gsm?.name}</span></p>}
					{substation?.mainChannelIp && <p>IP основного канала: <span className='sub-text'>{substation?.mainChannelIp}</span></p>}
					{substation?.backupChannelIp && <p className='text'>IP резервного канала: <span className='sub-text'>{substation?.backupChannelIp}</span></p>}
					<p className='text'>Всего выполнено работ: <span className="sub-text">{substation?.numberCompletedWorks}</span></p>
				</div>
				<div className="info__imgs">
					{substation?.files_photos_ps?.length ? (
						<CustomSlider>
							{substation.files_photos_ps.map(photo => (
								<div key={photo.id} data-src={`${urlFile}${photo.filePath}`} />
							))}
						</CustomSlider>
						) : (
							<ImageOff width={400} height={400} />
						)
					}
				</div>
			</div>

			<Tab tabs={[
				{id: 'backups', label: 'Backup', content: backupsContent},
				{id: 'photos', label: 'Фото ПС', content: photosContent},
				{id: 'other_files', label: 'Прочие файлы', content: otherContent}
			]} />

			<div className="info__btns info__btns-mt">
				<Button classBtn='btn-bg_blue' onClick={() => navigate(-1)}><ArrowLeft />Обратно</Button>
				<Link to={`/completed-works?substation=${substation?.id}`} className='btn btn-bg_green'>
					<BookTextIcon />Работы
				</Link>
			</div>
		</div>
	)
}

export default SubstationInfo