import { type FC } from 'react'
import { Button, Icon } from '../../../../../components'
import { useTmCoefficientCalculatorStore } from '../../../../../store/tmCoefficientCalculator'

const CalculationBtn: FC = () => {
	const quanta = useTmCoefficientCalculatorStore(state => state.quanta)
	const calculateResult = useTmCoefficientCalculatorStore(state => state.calculateResult)

	return (
		<Button
			type='button'
			className='w-[300px] hover:bg-gray-300/85 transition ease-out duration-500'
			onClick={calculateResult} disabled={!quanta}
		>
			<Icon id='calculator' />
			Рассчитать
		</Button>
	)
}

export default CalculationBtn
