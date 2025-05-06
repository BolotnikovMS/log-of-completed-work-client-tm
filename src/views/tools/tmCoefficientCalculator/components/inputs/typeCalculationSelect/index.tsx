import { ChangeEvent, type FC } from 'react'
import { Select } from '../../../../../../components'
import { typeCalculationData } from '../../../../../../data'
import { useTmCoefficientCalculatorStore } from '../../../../../../store/tmCoefficientCalculator'
import { TTypeCalculation } from '../../../../../../types'

const TypeCalculationSelect: FC = () => {
	const typeCalculation = useTmCoefficientCalculatorStore(state => state.typeCalculation)
	const setTypeCalculation = useTmCoefficientCalculatorStore(state => state.setTypeCalculation)

	const changeTypeCalculation = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as TTypeCalculation

		setTypeCalculation(value)
	}

	return (
		<Select onChange={changeTypeCalculation} defaultValue={typeCalculation}>
			{typeCalculationData.map(item => (
				<option key={item.value} value={item.value}>
					{item.lable}
				</option>
			))}
		</Select>
	)
}

export default TypeCalculationSelect
