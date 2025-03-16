import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IChannelEquipment, IQueryParams } from '../../interfaces'
import { TChannelEquipmentData, TRespChannelingEquipment } from '../../types'

export const ChannelEquipmentService = {
  async getChannelingEquipment({ limit, page }: IQueryParams): Promise<TRespChannelingEquipment> {
    const { data } = await instance.get(`${url}/channeling-equipments`, {
      params: { page, limit }
    })

    return data
  },

  async getChannelEquipmentById(id: number): Promise<IChannelEquipment> {
    const {data} = await instance.get<IChannelEquipment>(`${url}/channeling-equipments/${id}`)

    return data
  },

  async create(data: TChannelEquipmentData): Promise<AxiosResponse<IChannelEquipment>> {
    return await instance.post<IChannelEquipment>(`${url}/channeling-equipments`, data)
  },

  async update(id: number, data: TChannelEquipmentData): Promise<AxiosResponse<IChannelEquipment>> {
    return await instance.patch(`${url}/channeling-equipments/${id}`, data)
  },

  async delete(id: number): Promise<AxiosResponse<void>> {
    return await instance.delete(`${url}/channeling-equipments/${id}`)
  }
}
