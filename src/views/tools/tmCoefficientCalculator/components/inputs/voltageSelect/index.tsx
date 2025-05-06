import { ChangeEvent, type FC } from 'react'
import { Select } from '../../../../../../components'
import { voltageClassessData } from '../../../../../../data'
import { useTmCoefficientCalculatorStore } from '../../../../../../store/tmCoefficientCalculator'
import { TVoltage } from '../../../../../../types'

const VoltageSelect: FC = () => {
	const voltage = useTmCoefficientCalculatorStore(state => state.voltage)
	const setVoltage = useTmCoefficientCalculatorStore(state => state.setVoltage)

	const changeVoltage = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as TVoltage

		setVoltage(value)
	}
	return (
		<Select onChange={changeVoltage} defaultValue={voltage}>
			{voltageClassessData.map(item => (
				<option key={item.value} value={item.value}>{item.lable}</option>
			))}
		</Select>
	)
}

export default VoltageSelect
