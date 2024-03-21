import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IGsmOperator } from '../../interfaces'
import { TGsmOperatorData } from './gsm-operator.type'

export const GsmOperatorService = {
  async getGsmOperators(): Promise<IGsmOperator[]> {
    const { data } = await instance.get<IGsmOperator[]>(`${url}/gsm-operators`)

    return data
  },

  async create(data: TGsmOperatorData): Promise<AxiosResponse<IGsmOperator>> {
    return instance.post<IGsmOperator>(`${url}/gsm-operators`, data)
  },

  async updateGsmOperator({id, data}: {id: number, data: TGsmOperatorData}): Promise<AxiosResponse<IGsmOperator>> {
    return await instance.patch<IGsmOperator>(`${url}/gsm-operators/${id}`, data)
  },

  async deleteGsmOperator(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/gsm-operators/${id}`)
  }
}