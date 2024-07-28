import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { ICompletedWork, IQueryParams } from '../../interfaces'
import { TCompletedWorkData, TRespCompletedWork } from './completed-work.type'

export const CompletedWorkService = {
  async getAll({ limit, page, substation, executor, dateStart, dateEnd }: IQueryParams): Promise<TRespCompletedWork> {
    const { data } = await instance.get<TRespCompletedWork>(`${url}/completed-works`, {
      params: { page, limit, substation, executor, dateStart, dateEnd }
    })

    return data
  },

  async create(data: TCompletedWorkData): Promise<AxiosResponse<ICompletedWork>> {
    return instance.post<ICompletedWork>(`${url}/completed-works`, data)
  },

  async update(id: number, data: TCompletedWorkData): Promise<AxiosResponse<ICompletedWork>> {
    return await instance.patch<ICompletedWork>(`${url}/completed-works/${id}`, data)
  },

  async delete(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/completed-works/${id}`)
  }
}
