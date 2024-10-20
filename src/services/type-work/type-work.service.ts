import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IQueryParams, ITypeWork } from '../../interfaces'
import { TRespTypesWork, TTypeWorkData } from '../../types'

export const TypeWorkService = {
  async getTypesWork({ page, limit }: IQueryParams): Promise<TRespTypesWork> {
    const { data } = await instance.get<TRespTypesWork>(`${url}/types-work`, {
      params: { page, limit }
    })

    return data
  },

  async create(data: TTypeWorkData): Promise<AxiosResponse<ITypeWork>> {
    return await instance.post<ITypeWork>(`${url}/types-work`, data)
  },

  async update(id: number, data: TTypeWorkData): Promise<AxiosResponse<ITypeWork>> {
    return await instance.patch<ITypeWork>(`${url}/types-work/${id}`, data)
  },

  async delete(id: number): Promise<AxiosResponse<void>> {
    return await instance.delete<void>(`${url}/types-work/${id}`)
  }
}
