import { AxiosError } from 'axios'
import { useState } from 'react'
import { errorHandler } from '../../helpers'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useDownloadExcelYTMSubstations = ({ page, limit, typeKp, headController, district, objectType }: IQueryParams) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchData = async () => {
		setIsLoading(true)

		try {
			await SubstationService.downloadTelemechanicsDevicesExcel({ page, limit, typeKp, headController, district, objectType })
		} catch (error) {
			const err = error as AxiosError

			errorHandler(err)
			console.log(`Error download file: ${error}`)
		} finally {
			setIsLoading(false)
		}
	}


	return { isLoading, fetchData }
}
