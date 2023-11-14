import { IDistrict } from './district.interface'
import { TDistrictData } from './district.type'
import axios from 'axios'
import { url } from '../../constants'

export const DistrictService = {
  async getDistricts() {
    const response = await axios.get<IDistrict[]>(`${url}/districts`)

    return response.data
  },

  async create(data: TDistrictData) {
    return axios.post<TDistrictData>(`${url}/districts`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async getSubstationsRelatedDistrict(id: string) {
    const response = await axios.get(`${url}/districts/${id}/substations`)

    return response.data
  }
}
