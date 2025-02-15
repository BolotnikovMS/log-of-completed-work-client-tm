import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IHeadController, IQueryParams } from '../../interfaces'
import { THeadControllerData, TRespHeadController } from '../../types'

export const HeadControllerService = {
  async getHeadControllers({ limit, page }: IQueryParams): Promise<TRespHeadController> {
    const { data } = await instance.get<TRespHeadController>(`${url}/head-controllers`, {
      params: { limit, page }
    })

    return data
  },

  async create(data: THeadControllerData): Promise<AxiosResponse<IHeadController>> {
    return instance.post<IHeadController>(`${url}/head-controllers`, data)
  },

  async updateHeadController(id: number, data: THeadControllerData): Promise<AxiosResponse<IHeadController>> {
    return instance.patch<IHeadController>(`${url}/head-controllers/${id}`, data)
  },

  async deleteHeadController(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/head-controllers/${id}`)
  }
}
