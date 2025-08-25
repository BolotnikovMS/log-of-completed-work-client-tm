import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { Ilog, IQueryParams } from '../../interfaces'
import { TRespLogs } from '../../types/log.types'

export const LogService = {
	async getAllLog({ limit, page, action }: IQueryParams): Promise<TRespLogs> {
		const { data } = await instance.get<TRespLogs>(`${url}/logs`, {
			params: { page, limit, action }
		})

		return data
	},

	async getLogById(id: number): Promise<Ilog> {
		const { data } = await instance.get<Ilog>(`${url}/logs/${id}`)

		return data
	}
}
