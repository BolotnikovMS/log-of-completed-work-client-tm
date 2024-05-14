import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'

export const UploadService = {
	async upload(data: File): Promise<AxiosResponse<string>> {
		return instance.post(`${url}/upload`, data, {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onUploadProgress: (progressEvent: any) => {
				const { loaded, total } = progressEvent
				const percent = Math.floor((loaded * 100) / total)
				console.log('percent: ', percent)
			},
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}