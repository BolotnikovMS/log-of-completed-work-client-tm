import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { TNewFileUpload } from './file.type'

export const UploadService = {
	async upload(data: TNewFileUpload): Promise<AxiosResponse<string>> {
		return instance.post(`${url}/upload`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}