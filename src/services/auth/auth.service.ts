import { IGenericResponseLogout, IUser, IUserDataLogin, IUserLogin } from '../../interfaces'

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
	async logout(): Promise<IGenericResponseLogout> {
		const { data } = await instance.get<IGenericResponseLogout>('/logout')

		return data
	}
}