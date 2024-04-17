import { IQueryParams, IUser } from '../../interfaces'
import { TRespUsers, TUserData } from './user.type'

import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'

export const UserService = {
	async getUsers({ limit, page }: IQueryParams): Promise<TRespUsers> {
		const { data } = await instance.get<TRespUsers>(`${url}/users`, {
			params: { limit, page },
		})

		return data
	},

	async createUser(data: TUserData): Promise<AxiosResponse<IUser>> {
		return instance.post<IUser>(`${url}/users/create-account`, data)
	}
}