import { IQueryParams, ISubstation } from '../../interfaces'
import { TRespSubstations, TSubstationData } from './substation.type'

import axios from 'axios'
import { url } from '../../constants'

export const SubstationService = {
  async getSubstations({ limit, page }: IQueryParams) {
    const response = await axios<TRespSubstations>(`${url}/substations`, {
      params: { page, limit }
    })

    return response.data
  },

	async getSubstation(id: string): Promise<ISubstation> {
		const response =  await axios.get<ISubstation>(`${url}/substations/${id}`)

		return response.data
	},

  async create(data: TSubstationData) {
    return axios.post<TSubstationData>(`${url}/substations`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async update({id, data}: {id: number, data: TSubstationData}) {
    return await axios.patch(`${url}/substations/${id}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteSubstation(id: number) {
    return axios.delete<ISubstation>(`${url}/substations/${id}`)
  }
}