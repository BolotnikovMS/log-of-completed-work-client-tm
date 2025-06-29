import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Icon, Loader } from '../../../../components'
import { useDefectsTM } from '../../../../hooks'
import { IPropsDefectsNumber } from './defectsNumber.interface'

const DefectsNumber: FC<IPropsDefectsNumber> = ({ keyDefectSubstation }) => {
	if (!keyDefectSubstation) return null

	const { data: numberDefectsTM, isError: isErrorNDTM, isLoading: isLoadingNDTM } = useDefectsTM(keyDefectSubstation, { status: 'open' }, {
		enabled: !!keyDefectSubstation
	})
	const urlDefects = import.meta.env.VITE_DEFECTS_SHOW_URL
	!urlDefects && console.info('URL адрес ЖД не задан!')

	if (isErrorNDTM) {
		toast.error('Ошибка при попытке получения количества дефектов!')

		return null
	}

	return (
		<>
			{
				isLoadingNDTM ?
					<Loader className='!p-0' /> :
					<Link to={`${urlDefects}/${keyDefectSubstation}?status=open`} className={cn('mBtn btn-sm', numberDefectsTM && numberDefectsTM >= 1 ? 'mBtn_error' : 'mBtn_green')} target='_blank' rel="noopener noreferrer">
						<Icon id='alert' />
						Дефекты
						({numberDefectsTM})
					</Link>
			}
		</>
	)
}

export default DefectsNumber
