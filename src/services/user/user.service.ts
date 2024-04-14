import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IQueryParams } from '../../interfaces'
import { TRespUsers } from './user.type'

export const UserService = {
	async getUsers({ limit, page }: IQueryParams): Promise<TRespUsers> {
		const { data } = await instance.get<TRespUsers>(`${url}/users`, {
			params: { limit, page },
		})

		return data
	}
}