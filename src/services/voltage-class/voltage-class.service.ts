import { TResponseVoltageClass, TVoltageClass } from './voltage-class.type'

import { IQueryParams } from '../../interfaces'
import axios from 'axios'
import { url } from '../../constants'

export const VoltageClassService = {
  async getVoltageClasses({ limit, page }: IQueryParams) {
    const response = await axios.get<TResponseVoltageClass>(`${url}/voltage-classes`, {
      params: { page, limit }
    })

    return response.data
  },

  async create(data: TVoltageClass) {
    return axios.post<TVoltageClass>(`${url}/voltage-classes`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async updateVoltageClass({id, data}: {id: number, data: TVoltageClass}) {
    return await axios.patch(`${url}/voltage-classes/${id}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteVoltageClass(id: number) {
    return axios.delete<{id: number}>(`${url}/voltage-classes/${id}`)
  }
}