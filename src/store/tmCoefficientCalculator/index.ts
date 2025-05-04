import { create } from 'zustand'
import { tmCoefficientCalculator } from '../../helpers/tmCoefficientCalculator/tmCoefficientCalculator'
import { ITmCoefficientCalculatorStore } from './tmCoefficientCalculator.interface'

export const useTmCoefficientCalculatorStore = create<ITmCoefficientCalculatorStore>((set, get) => ({
  currentCoefficient: 0,
  quanta: 0,
  voltage: '6',
  typeCalculation: 'amperage',
  quantity: 'kilowatts',
  coefficient: 0,
  bias: 0,
  setCurrentCoefficient: (value) => set({ currentCoefficient: value }),
  setQuanta: (value) => set({ quanta: value }),
  setVoltage: (value) => set({ voltage: value }),
  setTypeCalculation: (value) => set({ typeCalculation: value }),
  setQuantity: (value) => set({ quantity: value }),
  calculateResult: () => {
    const { currentCoefficient, quanta, voltage, typeCalculation, quantity } = get()
    const result = tmCoefficientCalculator(typeCalculation, quanta, +voltage, currentCoefficient, quantity)

    set({ coefficient: result?.coefficient, bias: result?.bias })
  }
}))
