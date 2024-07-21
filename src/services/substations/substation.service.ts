import { type AxiosResponse } from 'axios'
import { IQueryParams, ISubstation } from '../../interfaces'
import { TRespSubstations, TSubstationData } from './substation.type'

import { instance } from '../../api/axios.api'
import { url } from '../../constants'

export const SubstationService = {
  async getSubstations({ limit, page, search, sort, order }: IQueryParams): Promise<TRespSubstations> {
    const { data } = await instance.get<TRespSubstations>(`${url}/substations`, {
      params: { page, limit, search, sort, order }
    })

    return data
  },

  async getSubstation(id: string): Promise<ISubstation> {
    const { data } = await instance.get<ISubstation>(`${url}/substations/${id}`)

    return data
  },

  async create(data: TSubstationData): Promise<AxiosResponse<ISubstation>> {
    return instance.post<ISubstation>(`${url}/substations`, data)
  },

  async update(id: number, data: TSubstationData): Promise<AxiosResponse<ISubstation>> {
    return await instance.patch<ISubstation>(`${url}/substations/${id}`, data)
  },

  async deleteSubstation(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/substations/${id}`)
  }
}
