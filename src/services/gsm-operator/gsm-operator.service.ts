import { IGsmOperator } from '../../interfaces'
import { TGsmOperatorData } from './gsm-operator.type'
import axios from 'axios'
import { url } from '../../constants'

export const GsmOperatorService = {
  async getGsmOperators() {
    const response = await axios.get<IGsmOperator[]>(`${url}/gsm-operators`)

    return response.data
  },

  async create(data: TGsmOperatorData) {
    return axios.post<TGsmOperatorData>(`${url}/gsm-operators`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async updateGsmOperator({id, data}: {id: number, data: TGsmOperatorData}) {
    return await axios.patch(`${url}/gsm-operators/${id}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteGsmOperator(id: number) {
    return axios.delete<IGsmOperator>(`${url}/gsm-operators/${id}`)
  }
}