import { IQueryParams, ISubstation } from '../../interfaces'

import { TRespSubstations } from './substation.type'
import axios from 'axios'
import { url } from '../../constants'

export const SubstationService = {
  async getSubstations({ limit, page }: IQueryParams) {
    const response = await axios<TRespSubstations>(`${url}/substations`, {
      params: { page, limit }
    })

    return response.data
  },

  async deleteSubstation(id: number) {
    return axios.delete<ISubstation>(`${url}/substations/${id}`)
  }
}