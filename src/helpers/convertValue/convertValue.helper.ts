import { TConvertValue } from './convertValue.type'

export const convertValue: TConvertValue = (value, quantity) => {
  if (typeof value !== 'number') return 0

  switch (quantity) {
    case 'watts':
      return value
    case 'kilowatts':
      return value / 1000
    case 'megawatts':
      return value / 1000 / 1000
    default:
      console.error('Ошибка при переводе значения!')

      return 0
  }
}
