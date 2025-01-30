import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IObjectType, IQueryParams } from '../../interfaces'
import { TObjectTypeData, TRespObjectTypes } from '../../types'

export const ObjectTypeService = {
	async getObjectTypes({ page, limit }: IQueryParams): Promise<TRespObjectTypes> {
		const { data } = await instance.get<TRespObjectTypes>(`${url}/object-types`, {
			params: { page, limit }
		})

		return data
	},

	async create(data: TObjectTypeData): Promise<AxiosResponse<IObjectType>> {
		return await instance.post<IObjectType>(`${url}/object-types`, data)
	},

	async update(id: number, data: TObjectTypeData): Promise<AxiosResponse<IObjectType>> {
		return await instance.patch<IObjectType>(`${url}/object-types/${id}`, data)
	},

	async delete(id: number): Promise<AxiosResponse<void>> {
		return await instance.delete<void>(`${url}/object-types/${id}`)
	}
}
