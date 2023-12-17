import axios from 'axios'
import { url } from '../../constants'
import { IChannelType, IQueryParams } from '../../interfaces'
import { TChannelTypeData, TRespChannelTypes } from './channel-type.type'

export const ChannelTypeService = {
  async getChannelTypes({ limit, page }: IQueryParams) {
    const response = await axios.get<TRespChannelTypes>(`${url}/channel-types`, {
      params: { page, limit }
    })

    return response.data
  },

  async create(data: TChannelTypeData ) {
    return axios.post<TChannelTypeData>(`${url}/channel-types`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async updateChannelType({id, data}: {id: number, data: TChannelTypeData}) {
    return await axios.patch(`${url}/channel-types/${id}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
  },

  async deleteChannelType(id: number) {
    return axios.delete<IChannelType>(`${url}/channel-types/${id}`)
  }
}