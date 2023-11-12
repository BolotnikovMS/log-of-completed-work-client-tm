import { IDistrict } from './district.interface'

export type IDistrictData = Omit<IDistrict, 'id' | 'slug' | 'userId'>
