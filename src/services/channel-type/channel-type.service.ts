import { IChannelType, IQueryParams } from '../../interfaces'
import { TChannelTypeData, TRespChannelTypes } from './channel-type.type'

import { type AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'

export const ChannelTypeService = {
  async getChannelTypes({ limit, page }: IQueryParams): Promise<TRespChannelTypes> {
    const { data } = await instance.get<TRespChannelTypes>(`${url}/channel-types`, {
      params: { page, limit }
    })

    return data
  },

  async create(data: TChannelTypeData): Promise<AxiosResponse<IChannelType>> {
    return instance.post<IChannelType>(`${url}/channel-types`, data)
  },

  async updateChannelType(id: number, data: TChannelTypeData): Promise<AxiosResponse<IChannelType>> {
    return instance.patch<IChannelType>(`${url}/channel-types/${id}`, data)
  },

  async deleteChannelType(id: number): Promise<AxiosResponse<void>> {
    return instance.delete(`${url}/channel-types/${id}`)
  }
}
