import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IQueryParams, ITelemechanicsDeviceInfo, ITelemechanicsDevices } from '../../interfaces'
import { TRespTelemechanicsDevices, TTelemechanicsDevice } from '../../types'

export const TelemechanicDeviceService = {
	async getAllDevices({ limit, page }: IQueryParams): Promise<TRespTelemechanicsDevices> {
		const { data } = await instance.get<TRespTelemechanicsDevices>(`${url}/telemechanics-devices`, {
			params: { page, limit }
		})

		return data
	},

	async getDeviceById(id: number): Promise<ITelemechanicsDevices> {
		const { data } = await instance.get<ITelemechanicsDevices>(`${url}/telemechanics-devices/${id}`)

		return data
	},

	async getDeviceInfoById(id: number): Promise<ITelemechanicsDeviceInfo> {
		const { data } = await instance.get<ITelemechanicsDeviceInfo>(`${url}/telemechanics-devices/${id}/info`)

		return data
	},

	async create(data: TTelemechanicsDevice): Promise<AxiosResponse<ITelemechanicsDevices>> {
		return instance.post<ITelemechanicsDevices>(`${url}/telemechanics-devices`, data)
	},

	async update(id: number, data: TTelemechanicsDevice): Promise<AxiosResponse<ITelemechanicsDevices>> {
		return instance.patch<ITelemechanicsDevices>(`${url}/telemechanics-devices/${id}`, data)
	},

	async delete(id: number): Promise<AxiosResponse<void>> {
		return instance.delete<void>(`${url}/telemechanics-devices/${id}`)
	}
}
