import { IDistrict, IQueryParams } from '../../interfaces'
import { TDistrictData, TRespDistricts } from './district.type'

import axios from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { TRespSubstations } from '../substations/substation.type'

export const DistrictService = {
  async getDistricts({ limit, page }: IQueryParams) {
    const response = await instance.get<TRespDistricts>(`${url}/districts`, {
      params: { page, limit },
    })

    return response.data
  },

  async create(data: TDistrictData) {
    return axios.post<TDistrictData>(`${url}/districts`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async getSubstationsRelatedDistrict(id: string) {
    const response = await axios.get<TRespSubstations>(`${url}/districts/${id}/substations`)

    return response.data
  },

  async updateDistrict({id, data}: {id: number, data: TDistrictData}) {
    return await axios.patch(`${url}/districts/${id}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteDistrict(id: number) {
    return axios.delete<IDistrict>(`${url}/districts/${id}`)
  }
}
