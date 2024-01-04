import axios from 'axios'
import { url } from '../../constants'
import { IQueryParams } from '../../interfaces'
import { TRespUsers } from './user.type'

export const UserService = {
	async getAll({ limit, page }: IQueryParams) {
		const response = await axios.get<TRespUsers>(`${url}/users`, {
			params: { page, limit }
		})

		return response.data
	}
}