import cn from 'classnames'
import { useEffect, type FC } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Icon, Loader, Tooltip } from '../../../../components'
import { useDefectsTM } from '../../../../hooks'
import { IPropsDefectsNumber } from './defectsNumber.interface'

const DefectsNumber: FC<IPropsDefectsNumber> = ({ keyDefectSubstation }) => {
	if (!keyDefectSubstation) return null

	const { data: numberDefectsTM, isError: isErrorNDTM, isLoading: isLoadingNDTM } = useDefectsTM(keyDefectSubstation, { status: 'open' }, {
		enabled: !!keyDefectSubstation,
		retry: 2
	})
	const urlDefects = import.meta.env.VITE_DEFECTS_SHOW_URL
	!urlDefects && console.info('URL адрес ЖД не задан!')

	useEffect(() => {
		if (isErrorNDTM) {
			toast.error('Ошибка при попытке получения количества дефектов!')
		}
	}, [isErrorNDTM])

	if (isLoadingNDTM) return <Loader className='!p-0' />
	if (isErrorNDTM) return null

	return (
		<Tooltip text='Переход в журнал дефектов'>
			<Link to={`${urlDefects}/${keyDefectSubstation}?status=open`} className={cn('mBtn btn-sm', numberDefectsTM && numberDefectsTM >= 1 ? 'mBtn_error' : 'mBtn_green')} target='_blank' rel="noopener noreferrer">
				<Icon id='alert' />
				Дефекты
				({numberDefectsTM})
			</Link>
		</Tooltip>
	)
}

export default DefectsNumber
