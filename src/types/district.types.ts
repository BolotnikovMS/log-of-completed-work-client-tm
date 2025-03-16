import { IDistrict, IMeta } from '../interfaces'

export type TDistrictData = Omit<IDistrict, 'id'>

export type TRespDistricts = { meta: IMeta, data: TDistrictShort[] }

export type TDistrictShort = Omit<IDistrict, 'shortName'>
