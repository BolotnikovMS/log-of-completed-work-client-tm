import { AxiosResponse } from 'axios'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { errorHandler } from '../../helpers'
import { IFile } from '../../interfaces/file.interface'
import { TNewFileUpload } from './file.type'

export const FileService = {
	async upload(data: TNewFileUpload): Promise<AxiosResponse<string>> {
		return instance.post(`${url}/files/upload`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	// async getImages(substationId: string) {
	// 	return await instance.get(`${url}/files/images`, {
	// 		params: { substation: substationId },
	// 		responseType: 'blob',
	// 		headers: {
	// 			'Cache-Control': 'no-cache',
	// 			'Content-Type': 'image'
	// 		},
	// 	})
	// },

	async download(file: IFile): Promise<void> {
		await instance.get(`${url}/files/download/${file.id}`, {
			responseType: 'blob'
		}).then(downloadFile => {
			fileDownload(downloadFile.data, file.clientName)
		}).catch(e => {
			toast.error(errorHandler(e))
		})
	},

	async delete(id: number): Promise<void> {
		return instance.delete(`${url}/files/${id}`)
	}
}