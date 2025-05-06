import { ChangeEvent, type FC } from 'react'
import { Input } from '../../../../../../components'
import { useTmCoefficientCalculatorStore } from '../../../../../../store/tmCoefficientCalculator'

const CurrentCoefficientInput: FC = () => {
	const currentCoefficient = useTmCoefficientCalculatorStore(state => state.currentCoefficient)
	const setCurrentCoefficient = useTmCoefficientCalculatorStore(state => state.setCurrentCoefficient)

	const changeCurrentCoefficient = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (/^\d*\.?\d*$/.test(value)) {
			setCurrentCoefficient(+value)
		}
	}

	return (
		<Input
			type="text"
			onChange={(e) => changeCurrentCoefficient(e)}
			value={!currentCoefficient ? '' : currentCoefficient}
			placeholder='Коэффициент по току'
			aria-autocomplete='none'
		/>
	)
}

export default CurrentCoefficientInput
