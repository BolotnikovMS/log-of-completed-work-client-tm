import { type FC } from 'react'
import { Tab } from '../../../../../components'

const InformationQuanta: FC = () => {
	const arisContent = <p className='text-content'>Полная шкала преобразованного сигнала - от 0 до 5 мА.</p>
	const isetContent = <p className='text-content'>Полная шкала преобразованного сигнала - от минус 5000 до плюс 5000 квантов.</p>
	const granitContent = <p className='text-content'>Полная шкала преобразованного сигнала - от 0 до 250 квантов.</p>
	const telecontrolContent = <p className='text-content'>Полная шкала преобразованного сигнала взятого с icp con - от -32768 до 32768 квантов.</p>

	return (
		<Tab
			classTab='w-1/2'
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
