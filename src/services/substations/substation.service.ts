import { type AxiosResponse } from 'axios'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { errorHandler } from '../../helpers'
import { IQueryParams, ISubstation } from '../../interfaces'
import { TRespSubstations, TSubstationData, TSubstationNoteData } from '../../types'

export const SubstationService = {
  async getSubstations({ limit, page, search, sort, order, typeKp, headController, district, channelCategory, channelType }: IQueryParams): Promise<TRespSubstations> {
    const { data } = await instance.get<TRespSubstations>(`${url}/substations`, {
      params: { page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType }
    })

    return data
  },

  async getSubstation(id: string): Promise<ISubstation> {
    const { data } = await instance.get<ISubstation>(`${url}/substations/${id}`)

    return data
  },

  async create(data: TSubstationData): Promise<AxiosResponse<ISubstation>> {
    return instance.post<ISubstation>(`${url}/substations`, data)
  },

  async update(id: number, data: TSubstationData): Promise<AxiosResponse<ISubstation>> {
    return instance.patch<ISubstation>(`${url}/substations/${id}`, data)
  },

  async updateNote(id: number, data: TSubstationNoteData): Promise<AxiosResponse<ISubstation>> {
    return instance.patch<ISubstation>(`${url}/substations/${id}/note`, data)
  },

  async deleteSubstation(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/substations/${id}`)
  },

  async downloadExcel({ page, limit, typeKp, headController, district, channelCategory, channelType }: IQueryParams) {
    await instance.get(`${url}/substations/download-substations-excel`, {
      params: { page, limit, typeKp, headController, district, channelCategory, channelType },
      responseType: 'blob'
    }).then(resp => {
      fileDownload(resp.data, 'substations-report.xlsx')
    }).catch(e => {
      toast.error(errorHandler(e))
    })
  }
}
