import { type AxiosResponse } from 'axios'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { errorHandler } from '../../helpers'
import { IQueryParams, ISubstation } from '../../interfaces'
import { TRespSubstations, TSubstationData } from './substation.type'

export const SubstationService = {
  async getSubstations({ limit, page, search, sort, order, typeKp, headController, mainChannel, backupChannel, district }: IQueryParams): Promise<TRespSubstations> {
    const { data } = await instance.get<TRespSubstations>(`${url}/substations`, {
      params: { page, limit, search, sort, order, typeKp, headController, mainChannel, backupChannel, district }
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
    return await instance.patch<ISubstation>(`${url}/substations/${id}`, data)
  },

  async deleteSubstation(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/substations/${id}`)
  },

  async downloadExcel({ typeKp, headController, mainChannel, backupChannel, district }: IQueryParams) {
    await instance.get(`${url}/substations/download-substations-excel`, {
      params: { typeKp, headController, mainChannel, backupChannel, district },
      responseType: 'blob'
    }).then(resp => {
      fileDownload(resp.data, 'report.xlsx')
    }).catch(e => {
      toast.error(errorHandler(e))
    })
  }
}
