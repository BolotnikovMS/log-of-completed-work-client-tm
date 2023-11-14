import { IDistrict } from './district.interface'

export type TDistrictData = Omit<IDistrict, 'id' | 'slug' | 'userId'>
