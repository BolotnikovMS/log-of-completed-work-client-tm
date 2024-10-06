import { AxiosError } from 'axios'
import { useState } from 'react'
import { errorHandler } from '../../helpers'
import { IQueryParams } from '../../interfaces'
import { ChannelService } from '../../services/channel/channel.service'

export const useDownloadExcelChannel = ({ page, limit, substation, channelType }: IQueryParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchData = async () => {
    setIsLoading(true)

    try {
      await ChannelService.downloadExcel({ page, limit, substation, channelType })
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
