import { ChangeEvent, type FC } from 'react'
import { quantitiesData } from '../../../../../../data'
import { useTmCoefficientCalculatorStore } from '../../../../../../store/tmCoefficientCalculator'
import { TQuantity } from '../../../../../../types'
import './index.scss'

const QuantitiesRadioGroup: FC = () => {
	const typeCalculation = useTmCoefficientCalculatorStore(state => state.typeCalculation)
	const quantity = useTmCoefficientCalculatorStore(state => state.quantity)
	const setQuantity = useTmCoefficientCalculatorStore(state => state.setQuantity)

	if (typeCalculation !== 'power' && typeCalculation !== 'powerReverse') return null

	const changeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as TQuantity

		setQuantity(value)
	}

	return (
		<div className="join">
			{quantitiesData.map(item => (
				<input
					key={item.value}
					className="join-item btn mRadio"
					type="radio"
					name="option"
					aria-label={item.name}
					onChange={changeQuantity}
					value={item.value}
					defaultChecked={item.value === quantity}
				/>
			))}
		</div>
	)
}

export default QuantitiesRadioGroup
