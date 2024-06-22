import { IChangePassword, IGenericResponseLogout, IUser, IUserDataLogin, IUserLogin } from '../../interfaces'

import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'

export const AuthService = {
	async login(userDate: IUserDataLogin): Promise<IUserLogin | null> {
		const { data } = await instance.post<IUserLogin>('/login', userDate)

		return data
	},
	async getProfile(): Promise<IUser | null> {
		const { data } = await instance.get<IUser>('/profile')

		return data
	},
	async changePassword(data: IChangePassword): Promise<AxiosResponse<string>> {
		return instance.patch('/change-password', data)
	},
	async logout(): Promise<IGenericResponseLogout> {
		const { data } = await instance.get<IGenericResponseLogout>('/logout')

		return data
	}
}