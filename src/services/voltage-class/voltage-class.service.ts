import { IQueryParams } from '../../interfaces'
import { TResponseVoltageClass } from './voltage-class.type'
import axios from 'axios'
import { url } from '../../constants'

export const VoltageClassService = {
  async getVoltageClasses({ limit, page }: IQueryParams) {
    const response = await axios.get<TResponseVoltageClass>(`${url}/voltage-classes`, {
      params: { page, limit }
    })

    return response.data
  }
}