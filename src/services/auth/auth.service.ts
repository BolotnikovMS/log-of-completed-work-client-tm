import { instance } from '../../api/axios.api'
import { IUserDataLogin } from '../../interfaces'

interface IUserLogin {
	id: number
	username: string
	email: string
	role: {
		name: string
	}
	fullName: string
	shortName: string
	type: string
	token: string
}

export const AuthService = {
	async login(userDate: IUserDataLogin): Promise<IUserLogin> {
		const { data } = await instance.post<IUserLogin>('/login', userDate)

		return data
	}
}