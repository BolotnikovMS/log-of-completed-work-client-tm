import { IDistrict, IMeta } from '../interfaces'

export type TDistrictData = Omit<IDistrict, 'id'>

export type TRespDistricts = { meta: IMeta, data: IDistrict[] }
