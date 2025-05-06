import { type FC } from 'react'
import CalculationBtn from '../btns'
import CurrentCoefficientInput from '../inputs/currentCoefficient'
import QuantaInput from '../inputs/quantaInput'
import QuantitiesRadioGroup from '../inputs/quantitiesRadioGroup'
import TypeCalculationSelect from '../inputs/typeCalculationSelect'
import VoltageSelect from '../inputs/voltageSelect'
import Results from '../result'

const TmCoefficientCalculator: FC = () => {
	return (
		<div className="flex flex-col gap-3 items-center">
			<CurrentCoefficientInput />
			<QuantaInput />
			<VoltageSelect />
			<TypeCalculationSelect />
			<QuantitiesRadioGroup />
			<CalculationBtn />
			<Results />
		</div>
	)
}

export default TmCoefficientCalculator
