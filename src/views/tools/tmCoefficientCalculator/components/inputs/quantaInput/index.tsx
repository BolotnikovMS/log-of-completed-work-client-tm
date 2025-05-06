import { ChangeEvent, type FC } from 'react'
import { Input } from '../../../../../../components'
import { useTmCoefficientCalculatorStore } from '../../../../../../store/tmCoefficientCalculator'

const QuantaInput: FC = () => {
	const quanta = useTmCoefficientCalculatorStore(state => state.quanta)
	const setQuanta = useTmCoefficientCalculatorStore(state => state.setQuanta)

	const changeQuanta = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (/^\d*\.?\d*$/.test(value)) {
			setQuanta(+value)
		}
	}

	return (
		<Input
			type='text'
			onChange={(e) => changeQuanta(e)}
			value={!quanta ? '' : quanta}
			placeholder='Кванты'
			aria-autocomplete='none'
		/>
	)
}

export default QuantaInput
