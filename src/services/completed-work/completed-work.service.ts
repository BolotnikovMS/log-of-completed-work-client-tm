import { ICompletedWork, IQueryParams } from '../../interfaces'
import { TCompletedWorkData, TRespCompletedWork } from './completed-work.type'

import axios from 'axios'
import { url } from '../../constants'

export const CompletedWorkService = {
	async getAll({ limit, page }: IQueryParams) {
		const response = await axios.get<TRespCompletedWork>(`${url}/completed-works`, {
			params: { page, limit }
		})

		return response.data
	},

	async create(data: TCompletedWorkData) {
		return axios.post<TCompletedWorkData>(`${url}/completed-works`, data, {
			headers: {'Content-Type': 'application/json'}
		})
	},

	async update({id, data}: {id: number, data: TCompletedWorkData}) {
		return await axios.patch(`${url}/completed-works/${id}`, data, {
			headers: {'Content-Type': 'application/json'}
		})
	},

	async delete(id: number) {
		return axios.delete<ICompletedWork>(`${url}/completed-works/${id}`)
	}
}