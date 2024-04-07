import { IUser } from '../../interfaces'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'

export const UserService = {
	async getUsers() {
		const { data } = await instance.get<IUser[]>(`${url}/users`)

		return data
	}
}