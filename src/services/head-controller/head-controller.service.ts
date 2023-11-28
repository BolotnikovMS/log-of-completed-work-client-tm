import { THeadControllerData, TRespHeadController } from './head-controller.type'

import { IQueryParams } from '../../interfaces'
import axios from 'axios'
import { url } from '../../constants'

export const HeadControllerService = {
  async getHeadControllers({ limit, page }: IQueryParams) {
    const response = await axios.get<TRespHeadController>(`${url}/head-controllers`, {
      params: { limit, page }
    })

    return response.data
  },

  async create(data: THeadControllerData) {
    return axios.post<THeadControllerData>(`${url}/head-controllers`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteHeadController(id: number) {
    return axios.delete<{id: number}>(`${url}/head-controllers/${id}`)
  }
}