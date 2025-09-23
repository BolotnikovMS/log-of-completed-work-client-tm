import { AxiosResponse } from 'axios'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { errorHandler } from '../../helpers'
import { TFile, TFileUpdName, TFileUploadData } from '../../types'

export const FileService = {
	async upload(data: TFileUploadData): Promise<AxiosResponse<string>> {
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

	async download(file: TFile): Promise<void> {
		await instance.get(`${url}/files/download/${file.id}`, {
			responseType: 'blob'
		}).then(resp => {
			fileDownload(resp.data, file.clientName)
		}).catch(e => {
			toast.error(errorHandler(e))
		})
	},

	async delete(id: number): Promise<void> {
		return instance.delete(`${url}/files/${id}`)
	},

	async uploadCSVSubstationKey(file: File): Promise<AxiosResponse<{ message: string, proccesed: number }>> {
		return instance.post(`${url}/files/upload-substation-key`, file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async updateNameFile(id: number, data: TFileUpdName): Promise<AxiosResponse<{ message: string }>> {
		return instance.patch(`${url}/files/update-file-name/${id}`, data)
	}
}
