import { IMeta, IObjectType } from '../interfaces'

export type TObjectTypeData = Omit<IObjectType, 'id'>

export type TRespObjectTypes = { meta: IMeta, data: TObjectTypeShort[] }

export type TObjectTypeShort = Omit<IObjectType, 'shortName'>
