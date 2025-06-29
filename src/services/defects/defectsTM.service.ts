import axios from 'axios'
import { urlApiDefects } from '../../constants'
import { IQueryParams } from '../../interfaces'

export const DefectsTMService = {
	async getNumberDefectsByIdSubstation(id: number, { status }: IQueryParams): Promise<number> {
		const { data } = await axios.get<number>(`${urlApiDefects}/defects-tm/${id}/count`, {
			params: { status }
		})

		return data
	}
}
