import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { IRole } from '../../interfaces'

export const RoleService = {
  async getRoles(): Promise<IRole[]> {
    const { data } = await instance.get<IRole[]>(`${url}/users/roles`)

    return data
  }
}
