import { IDistrict, IMeta } from '../interfaces'

export type TDistrictData = Omit<IDistrict, 'id' | 'userId'>

export type TRespDistricts = { meta: IMeta, data: IDistrict[] }
