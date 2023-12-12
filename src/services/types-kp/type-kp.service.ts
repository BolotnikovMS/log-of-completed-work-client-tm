import { TRespTypesKp, TTypeKpData } from './type-kp.type';

import { IQueryParams } from '../../interfaces'
import axios from 'axios'
import { url } from '../../constants'

export const TypeKpService = {
  async getTypesKp({ limit, page }: IQueryParams) {
    const response = await axios.get<TRespTypesKp>(`${url}/types-kp`, {
      params: { page, limit }
    })

    return response.data
  },

  async create(data: TTypeKpData) {
    return axios.post<TTypeKpData>(`${url}/types-kp`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async updateTypeKp({id, data}: {id: number, data: TTypeKpData}) {
    return await axios.patch(`${url}/types-kp/${id}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteTypeKp(id: number) {
    return axios.delete<{id: number}>(`${url}/types-kp/${id}`)
  }
}