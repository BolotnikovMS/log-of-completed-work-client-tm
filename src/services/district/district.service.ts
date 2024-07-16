import { IDistrict, IQueryParams } from '../../interfaces'
import { TDistrictData, TRespDistricts } from './district.type'

import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { TRespSubstations } from '../substations/substation.type'

export const DistrictService = {
  async getDistricts({ limit, page }: IQueryParams): Promise<TRespDistricts> {
    const { data } = await instance.get<TRespDistricts>(`${url}/districts`, {
      params: { page, limit },
    })

    return data
  },

  async create(data: TDistrictData): Promise<AxiosResponse<IDistrict>> {
   return instance.post<IDistrict>(`${url}/districts`, data)
  },

  async getSubstationsRelatedDistrict(id: string, { search, sort, order }: IQueryParams): Promise<TRespSubstations> {
    const { data } = await instance.get<TRespSubstations>(`${url}/districts/${id}/substations`, {
			params: { search, sort, order },
		})

    return data
  },

  async updateDistrict(id: number, data: TDistrictData): Promise<AxiosResponse<IDistrict>> {
    return await instance.patch<IDistrict>(`${url}/districts/${id}`, data)
  },

  async deleteDistrict(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/districts/${id}`)
  }
}
