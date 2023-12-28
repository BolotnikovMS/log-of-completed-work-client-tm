import { ICompletedWork, IQueryParams } from '../../interfaces'

import axios from 'axios'
import { url } from '../../constants'
import { TRespCompletedWork } from './completed-work.type'

export const CompletedWorkService = {
	async getAll({ limit, page }: IQueryParams) {
		const response = await axios.get<TRespCompletedWork>(`${url}/completed-works`, {
			params: { page, limit }
		})

		return response.data
	},

	async delete(id: number) {
		return axios.delete<ICompletedWork>(`${url}/completed-works/${id}`)
	}
}