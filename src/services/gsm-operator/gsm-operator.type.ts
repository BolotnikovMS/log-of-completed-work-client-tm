import { IGsmOperator } from '../../interfaces'

export type TGsmOperatorData = Omit<IGsmOperator, 'id' | 'slug' | 'userId'>