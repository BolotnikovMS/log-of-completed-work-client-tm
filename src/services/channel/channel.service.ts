import { AxiosResponse } from 'axios'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { errorHandler } from '../../helpers'
import { IChannel, IQueryParams } from '../../interfaces'
import { TChannelData, TChannelInfo, TRespChannels } from '../../types'

export const ChannelService = {
	async getChannels({ limit, page, substation, channelType, channelCategory }: IQueryParams): Promise<TRespChannels> {
		const { data } = await instance.get<TRespChannels>(`${url}/channels`, {
			params: { page, limit, substation, channelType, channelCategory }
		})

		return data
	},

	async getChannelById(id: number): Promise<IChannel> {
		const { data } = await instance.get<IChannel>(`${url}/channels/${id}`)

		return data
	},

	async getChannelInfo(id: number): Promise<TChannelInfo> {
		const { data } = await instance.get<TChannelInfo>(`${url}/channels/${id}/info`)

		return data
	},

	async create(data: TChannelData): Promise<AxiosResponse<IChannel>> {
		return instance.post<IChannel>(`${url}/channels`, data)
	},

	async update(id: number, data: TChannelData): Promise<AxiosResponse<IChannel>> {
		return instance.patch<IChannel>(`${url}/channels/${id}`, data)
	},

	async delete(id: number): Promise<AxiosResponse<void>> {
		return instance.delete<void>(`${url}/channels/${id}`)
	},

	async downloadExcel({ page, limit, substation, channelType, channelCategory }: IQueryParams): Promise<void> {
		await instance.get(`${url}/channels/download-excel`, {
			params: { page, limit, substation, channelType, channelCategory },
			responseType: 'blob'
		}).then(resp => {
			fileDownload(resp.data, 'channels-report.xlsx')
		}).catch(e => {
			toast.error(errorHandler(e))
		})
	}
}
