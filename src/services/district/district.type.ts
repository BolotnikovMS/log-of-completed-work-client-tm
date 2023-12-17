import { IDistrict, IMeta } from '../../interfaces'

export type TDistrictData = Omit<IDistrict, 'id' | 'slug' | 'userId'>

export type TRespDistricts = { meta: IMeta, data: IDistrict[] }