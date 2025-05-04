import { convertValue } from '../convertValue/convertValue'
import { TCalculate } from './tmCoefficientCalculator.type'

export const tmCoefficientCalculator: TCalculate = (typeCalculation, quanta, voltage, currentCoefficient, quantity) => {
  let coefficient: number = 0
  let bias: number = 0

  switch (typeCalculation) {
    case 'amperage': {
      coefficient = currentCoefficient / quanta

      break
    }
    case 'voltage1': {
      coefficient = voltage * 1.25 / quanta

      break
    }
    case 'voltage2': {
      coefficient = (voltage * 1.25) / (quanta * 2.5)
      bias = voltage * 0.75

      break
    }
    case 'power': {
      const result = (currentCoefficient * voltage * Math.sqrt(3)) / quanta

      coefficient = convertValue(result, quantity)

      break
    }
    case 'powerReverse': {
      const result = ((currentCoefficient * voltage * Math.sqrt(3)) / quanta) * 2
      const resulyBias = -(currentCoefficient * voltage * Math.sqrt(3))

      coefficient = convertValue(result, quantity)
      bias = convertValue(resulyBias, quantity)

      break
    }
    default: {
      console.error('Ошибка при расчете коэффициента и сдвига!')

      return null
    }
  }

  return { coefficient: +coefficient.toFixed(7), bias: +bias.toFixed(7) }
}
