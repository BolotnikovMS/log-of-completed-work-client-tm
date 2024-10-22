import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IChangePassword, IQueryParams, IUser, IUserRole } from '../../interfaces'
import { TChangeStatusAccount, TRespUsers, TUserData } from '../../types'

export const UserService = {
  async getUsers({ limit, page, active, cleanUser }: IQueryParams): Promise<TRespUsers> {
    const { data } = await instance.get<TRespUsers>(`${url}/users`, {
      params: { limit, page, active, cleanUser },
    })

    return data
  },

  async createUser(data: TUserData): Promise<AxiosResponse<IUser>> {
    return instance.post<IUser>(`${url}/users/create-account`, data)
  },

  async resetPassword(idUser: number, data: IChangePassword): Promise<AxiosResponse<string>> {
    return instance.patch(`/users/reset-password/${idUser}`, data)
  },

  async changeStatusAccount({ active, id }: TChangeStatusAccount): Promise<AxiosResponse<string>> {
    return instance.patch(`/users/block-user-account/${id}`, { active })
  },

  async changeUserRole(idUser: number, data: IUserRole): Promise<AxiosResponse<string>> {
    return instance.patch(`/users/change-role/${idUser}`, data)
  },
}
