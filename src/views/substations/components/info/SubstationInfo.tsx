import { ArrowLeft, BookTextIcon, Image } from 'lucide-react'
import { type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Error, Loader } from '../../../../components'
import { useSubstation } from '../../../../hooks'
import './info.scss'

const SubstationInfo: FC = () => {
	const { id } = useParams()
	const { substation, error, isError, isLoading } = useSubstation(id)
	const navigate = useNavigate()

	return (
		<>
			{isLoading ? (<Loader />) :
				isError ? (<Error error={error}/>) :
					(
						<>
							<h1 className='title'>{substation?.fullNameSubstation}</h1>
							<div className="info info-mt">
								<div className="info__wrapper">
									<div className="info__content">
										<p>РЭС/ГП: <span className='text__sub'>{substation?.district?.name}</span></p>
										<p>РДУ: <span className='text__sub'>{substation?.rdu ? 'Да' : 'Нет'}</span></p>
										<p>Тип КП: <span className='text__sub'>{substation?.type_kp?.name}</span></p>
										<p>Головной контроллер: <span className='text__sub'>{substation?.head_controller?.name}</span></p>
										<p>Основной канал: <span className='text__sub'>{substation?.main_channel?.name}</span></p>
										{substation?.backup_channel &&  <p>Резервный канал: <span className='text__sub'>{substation?.backup_channel ? substation?.backup_channel.name : '-' }</span></p>}
										{substation?.additional_channel && <p>Дополнительный канал: <span className='text__sub'>{substation?.additional_channel.name}</span></p>}
										{substation?.gsm && <p>Gsm оператор: <span className='text__sub'>{substation?.gsm?.name}</span></p>}
										{substation?.mainChannelIp && <p>IP основного канала: <span className='text__sub'>{substation?.mainChannelIp}</span></p>}
										{substation?.backupChannelIp && <p>IP резервного канала: <span className='text__sub'>{substation?.backupChannelIp}</span></p>}
										<p>Всего выполнено работ: <span className="text__sub">{substation?.numberCompletedWorks}</span></p>
									</div>
									<div className="info__imgs">
										<Image width={400} height={400}/>
									</div>
								</div>
								<div className="info__btns info__btns-mt">
									<Button classBtn='btn-bg_blue' onClick={() => navigate(-1)}><ArrowLeft />Обратно</Button>
									<Button classBtn='btn-bg_green'><BookTextIcon />Работы</Button>
								</div>
							</div>
						</>
					)
			}
		</>
	)
}

export default SubstationInfo