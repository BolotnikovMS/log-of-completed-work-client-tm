import { type FC } from 'react'
import { useTmCoefficientCalculatorStore } from '../../../../../store/tmCoefficientCalculator'

const Results: FC = () => {
	const coefficient = useTmCoefficientCalculatorStore(state => state.coefficient)
	const bias = useTmCoefficientCalculatorStore(state => state.bias)

	return (
		<div className="flex flex-col gap-1 items-center">
			<p className='text-content'>Результат: <span className='font-bold text-red-500'>{coefficient}</span></p>
			<p className='text-content'>Смещение: <span className='font-bold text-red-500'>{bias}</span></p>
		</div>
	)
}

export default Results
