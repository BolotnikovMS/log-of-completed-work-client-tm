import { AxiosError } from 'axios'
import { useState } from 'react'
import { errorHandler } from '../../helpers'
import { IQueryParams } from '../../interfaces'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useDownloadExcelCompletedWork = ({ page, limit, substation, executor, dateStart, dateEnd }: IQueryParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchData = async () => {
    setIsLoading(true)

    try {
      await CompletedWorkService.downloadExcel({ page, limit, substation, executor, dateStart, dateEnd })
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
