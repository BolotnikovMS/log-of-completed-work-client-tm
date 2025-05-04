import { TQuantity, TTypeCalculation, TVoltage } from '../../types'

export interface ITmCoefficientCalculatorStore {
  currentCoefficient: number
  quanta: number
  voltage: TVoltage
  typeCalculation: TTypeCalculation
  quantity: TQuantity
  coefficient: number
  bias: number
  setCurrentCoefficient: (value: number) => void
  setQuanta: (value: number) => void
  setVoltage: (value: TVoltage) => void
  setTypeCalculation: (value: TTypeCalculation) => void
  setQuantity: (value: TQuantity) => void
  calculateResult: () => void
}
