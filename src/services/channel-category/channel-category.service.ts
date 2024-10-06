import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IChannelCategory, IQueryParams } from '../../interfaces'
import { TRespChannelCategories, TChannelCategoryData } from '../../types'

export const ChannelCategoryService = {
  async getChannelCategories({ limit, page }: IQueryParams): Promise<TRespChannelCategories> {
    const { data } = await instance.get<TRespChannelCategories>(`${url}/channel-categories`, {
      params: { page, limit }
    })

    return data
  },

  async create(data: TChannelCategoryData): Promise<AxiosResponse<IChannelCategory>> {
    return instance.post<IChannelCategory>(`${url}/channel-categories`, data)
  },

  async update(id: number, data: TChannelCategoryData): Promise<AxiosResponse<IChannelCategory>> {
    return instance.patch<IChannelCategory>(`${url}/channel-categories/${id}`, data)
  },

  async delete(id: number): Promise<AxiosResponse<void>> {
    return instance.delete<void>(`${url}/channel-categories/${id}`)
  }
}
