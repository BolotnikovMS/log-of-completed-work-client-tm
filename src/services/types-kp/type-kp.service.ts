import { IQueryParams, ITypeKp } from '../../interfaces'
import { TRespTypesKp, TTypeKpData } from './type-kp.type'

import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'

export const TypeKpService = {
  async getTypesKp({ limit, page }: IQueryParams): Promise<TRespTypesKp> {
    const { data } = await instance.get<TRespTypesKp>(`${url}/types-kp`, {
      params: { page, limit }
    })

    return data
  },

  async create(data: TTypeKpData): Promise<AxiosResponse<ITypeKp>> {
    return instance.post<ITypeKp>(`${url}/types-kp`, data)
  },

  async updateTypeKp({id, data}: {id: number, data: TTypeKpData}): Promise<AxiosResponse<ITypeKp>> {
    return await instance.patch<ITypeKp>(`${url}/types-kp/${id}`, data)
  },

  async deleteTypeKp(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/types-kp/${id}`)
  }
}