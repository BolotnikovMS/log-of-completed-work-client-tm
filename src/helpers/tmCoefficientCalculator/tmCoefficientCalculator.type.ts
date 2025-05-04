export type TCalculate = (typeCalculation: string, quanta: number, voltage: number, currentCoefficient: number, quantity: string) => { coefficient: number, bias: number } | null
