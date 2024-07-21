import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IQueryParams, IVoltageClass } from '../../interfaces'
import { TResponseVoltageClass, TVoltageClass } from './voltage-class.type'

export const VoltageClassService = {
  async getVoltageClasses({ limit, page }: IQueryParams): Promise<TResponseVoltageClass> {
    const { data } = await instance.get<TResponseVoltageClass>(`${url}/voltage-classes`, {
      params: { page, limit }
    })

    return data
  },

  async create(data: TVoltageClass): Promise<AxiosResponse<IVoltageClass>> {
    return instance.post<IVoltageClass>(`${url}/voltage-classes`, data)
  },

  async updateVoltageClass(id: number, data: TVoltageClass): Promise<AxiosResponse<IVoltageClass>> {
    return await instance.patch<IVoltageClass>(`${url}/voltage-classes/${id}`, data)
  },

  async deleteVoltageClass(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/voltage-classes/${id}`)
  }
}
