import { AxiosError } from 'axios'
import { useState } from 'react'
import { errorHandler } from '../../helpers'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useDownloadExcelSubstations = ({ page, limit, typeKp, headController, district, channelCategory, channelType }: IQueryParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    setIsLoading(true)

    try {
      await SubstationService.downloadExcel({ page, limit, typeKp, headController, district, channelCategory, channelType })
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
