import { type FC } from 'react'
import { Tab } from '../../../../../components'

const InformationQuanta: FC = () => {
	const arisContent = <p className='text-content'>Полная шкала преобразованного сигнала - <span className='italic text-red-500'>от 0 до 5 мА.</span></p>
	const isetContent = <p className='text-content'>Полная шкала преобразованного сигнала - <span className='italic text-red-500'>от -5000 до +5000 квантов</span>.</p>
	const granitContent = <p className='text-content'>Полная шкала преобразованного сигнала - <span className='italic text-red-500'>от 0 до 250 квантов</span>.</p>
	const telecontrolContent = <p className='text-content'>Полная шкала преобразованного сигнала взятого с icp con - <span className='italic text-red-500'>от -32768 до +32768 квантов</span>.</p>

	return (
		<Tab
			classTab='lg:w-1/2 md:w-full'
			classContainer='py-6'
			tabs={[
				{ id: 'aris', label: 'Aris', content: arisContent },
				{ id: 'iset', label: 'Исеть', content: isetContent },
				{ id: 'granit', label: 'Гранит', content: granitContent },
				{ id: 'telecontrol', label: 'Телеконтроль', content: telecontrolContent }
			]}
		/>
	)
}

export default InformationQuanta
